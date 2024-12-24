---
title: 'Advanced Retrieval Augmented Generation'
publishedAt: 'January 27, 2024'
description: 'For domain specific tasks should we fine-tune a foundation model or build a new traditional model from scratch?'
coverImage: '/images/advanced-rag/rag.jpg'
---

![Scientist](/images/advanced-rag/rag.jpg)

&nbsp;

---

_This write up focuses on Advanced Retrieval Augmented Generation (RAG) techniques and assume you understand the basics of RAG. We also concentrate on Llamaindex._

Many of my colleagues have asked me about how we built a RAG (Retrieval augmented generation) system, i.e a chatbot that talks to your private data. You can build them with a few lines of code with libraries like Langchain and LlamaIndex. While this is really easy, you will find it will only get you 70% of the way. The completions may still not be production ready as you will encounter inaccuracies and undesired outputs. Some may not be in line with your product objectives or corporate identity.

So lets look at some ways to tackle this, but first what are some of the main benefits of RAG?

### Benefits

- **Enhanced Accuracy:** By including your relevant external sources you get more accurate and contextualised responses.

- **Reduced Hallucinations:** By adding new data that is not in the training data it reduces the likelihood of hallucinations.

- **Up to date responses:** You have control of the sources so keeping them up to data is easier with no need to train another model.

- **Domain specific information:** You can supply domain specific information and therefore get domain specific responses.

- **Citations:** You can cite the sources easier giving the responses more credibility and reliability.

Lets also look at some issues we still find we have after implementing a basic RAG system?

### Issues

- Retrieved documents lack relevancy: This is pretty much the main issue. The documents retrieved have Low precision (the chunks received lack relevancy) or Low recall (the search has not returned the most relevant results).

- Unwanted LLM responses like hallucinations, irrelevancy, toxicity and bias.

- Structured and unstructured data are not chunked in a way that facilitates proper retrieval.

- User are making complex queries that have not been accounted for in the implementation.

- The tone and behaviour of the LLM outputs are not within required guidelines.

- Out of date documents are retrieved, due to lack of newly ingested information or lack of temporal metadata.

- Non domain specific embeddings: Your embeddings are not domain specific so there is a mismatch in the semantics.

- Costs are higher than initially accounted for as the context is unnecessarily larger than required, causing over use of tokens.
  Your data is not private. The best, as I write, is GPT4 and this means sending your data to a third party. Finding solutions to this is tricky without compromising on quality.
  So let’s look at some of the ways to optimise LLM performance and squeeze that extra 30% out of completions.

### The Process


Here is the RAG pipeline process we cover.

![Scientist](/images/advanced-rag/process.png)

&nbsp;

Of course before we dive into this let’s look at prompting.

### Prompting

So first off in our armouring we have the prompt. Let look at some that techniques that can help us steer the LLM into focusing on our required use case.

**Few-Shot Prompting** is a technique where the LLM is provided with a limited number of examples or shots to learn from. This approach is useful in situations where large datasets are not available and the model needs to adapt and respond accurately with minimal training data.

**Chain of Thought (CoT)** is an advanced technique in prompt engineering for LLMs that involves guiding the model through a step-by-step reasoning process to arrive at a conclusion. By doing this Chain of Thought improves the the models ability to tackle complex tasks that require logical reasoning, deep understanding or multi-step calculations. CoT has been particularly effective in improving performance on arithmetic, logic puzzles, and comprehension tasks.

**Tree of Thoughts (ToT)** is a framework that extends the Chain of Thought approach by creating a tree-like structure of thoughts or reasoning steps. This method allows for more extensive exploration and branching in the thought process, enabling LLMs to consider multiple pathways and scenarios before arriving at it’s conclusion.

**Multimodal CoT (Chain of Thought)** involves using multiple modes of thought or reasoning processes within a single prompt. This approach can combine different reasoning styles, such as logical, creative, or empirical thinking, to produce more comprehensive and well-rounded responses from LLMs.

**Prompt Chaining** involves linking multiple prompts in a sequential manner, where the output of one prompt serves as the input for the next. This method is particularly effective for complex tasks that can be broken down into smaller, more manageable sub-tasks, leading to more accurate and refined outputs.

**Self-Consistency** in prompt engineering aims to ensure that responses from LLMs are not only accurate but also consistent across different iterations or contexts. This involves techniques to check and reinforce the consistency of the model’s responses, thereby enhancing reliability and trustworthiness.

As you can see there are plenty of techniques and more emerging everyday. Check out the prompt guide for more ways to enhance your prompting here.

![Scientist](/images/advanced-rag/indexing.jpeg)

&nbsp;

### Indexing

Choosing the index: The search index is one of the main components of a RAG pipeline as it holds your unstructured vectorised content. Efficient retrieval is achieved using algorithms such as Approximate Nearest Neighbours which include clustering, trees, or the HNSW algorithm.

Some managed solutions like ElasticSearch, Pinecone, Weaviate, or Chroma will handle your data ingestion pipelines out of the box. Also make sure your chosen vector store supports storing metadata as this is vital to support citations..

LlamaIndex is a data framework for LLM-based applications to ingest, structure, and access private or domain-specific data. It’s available in Python and Typescript.

- Standard Chunking: When chunking, the demarcation between chunks might be clear, like tweets or paragraphs in a document. However its best to aim for a balance between enough content and specificity. The type of retrieval approach also plays a key role in deciding on the chunking strategy, like summarisation or sentence window retrieval (covered later). For complex documents, consider strategies like hierarchical indexing (covered here).

- Semantic chunking: Is a chunking strategy where a semantic splitter adaptively picks the breakpoint in-between sentences to split on, using embedding similarity. So when there is a large change in the similarity then a split occurs. See more here.

- Hierarchical Indexing: In cases of large and complex datasets Hierarchical Indexing creates a two-level index: one for document summaries and another for detailed chunks within those documents. This method speeds up the retrieval process by first narrowing down relevant documents through their summaries.

- Metadata Indexing: Indexing metadata (like author, date, tags along side the text chunks enhances retrieval by allowing filtering and the creation of citations. Hybrid search which we see later is a great retrieval mechanism that relies on metadata.

- Table indexing. To properly index tables and complex structure you need to make sure you can find them and also that they are in complete chunks. One method is to Extract tables from a PDF using an unstructured data parser, caption them with a LLM for context and then index both the table and its caption in a node to improve recall of relevant information.

- Embedding Model Selection: The choice of the embedding model for vectorisation is crucial. Depending on the nature of the data and the specific use caseIt may be worth fine tuning your embedding. Check out some info on this here.

### Querying

There are many ways to enhance this part of the process. Methods like and query construction, query expansion and query transformations can each can play a part in enhancing the search process.

**Query Construction:**
Transforms NLP queries to data source formats. It changes questions into vector formats for unstructured data or reformats queries for structured data sources

- Vector Format Conversion: Changes questions into vectors for querying unstructured data placed into a vector store.

- Metadata Filtering: You can use a Hybrid Search Approach that utilises a combination of MetadataFilter and vector search classes for comprehensive search results.

  Example: A query such as “movies about aliens in the year 1980” is split into:

      A vector query for “aliens”.
      A structured SQL query for metadata, specifically “year == 1980”.

- Text-to-SQL Technology: Transforms natural language into SQL queries.

- Text-to-KnowledgeGraph: Transforms natural language into Knowledge Graph queries.

**Query Expansion:**

- Hypothetical Questions and HyDE: Enhances the search by first generating hypothetical answers to the query with a LLM. Then by adding these alongside the query in the semantic search on the vector store it results in a better match. This method is particularly useful for complex queries where a semantic match on just the query may not be enough. HyDE adds an additional layer of semantic understanding, making it better at retrieving chunks that aligns more closely with the user’s intent.

- Sub-Question Query Engines: Sub-Question Query Engines adopt a divide-and-conquer approach. They decompose complex queries into a series of sub-questions, each targeting specific aspects of the original inquiry. These are then fed to appropriate separate index(s) to give a more accurate result set formed from multiple data sources.

- Query Routing: Routing the same query to either one or many search data sources and then aggregating the response can also help with relevant responses. Routers use tools and select from them depending on the query, the tool is then executed to call the data sources with the correctly formatted query.


![Scientist](/images/advanced-rag/querying.jpeg)

&nbsp;

### Retrieval

**Top-k Retrieval:**

Playing with your top-k and using a similarity cutoff on a post processor will get you so far. But let’s look at some more advanced ways to retrieve those right documents.

- Context Enrichment:

This involves retrieving smaller chunks for better search quality and then adding surrounding context for the LLM to reason upon. This is also called Small-to-Big Retrieval. Here are two methods:

-  **Window Retrieval:** Embed each sentence separately and then after fetching the most relevant sentence extend the context window by adding sentences before and after the retrieved sentence.

-  **Auto-merging Retriever (Parent Document Retriever):**  Split documents into smaller child chunks that refer to larger parent chunks. During retrieval, if multiple top retrieved chunks are linked to the same parent node, replace them with this parent chunk.

Others include.

- **Metadata Filtering:** Filters information based on specific criteria like year.

- **Recursive Retrieval:** Recursive retrieval method is particularly effective for documents with a hierarchical structure, allowing them to form relationships and connections between the nodes. This is great in cases like a PDF, which may contain “sub-data” such as tables and diagrams and references to other documents. This technique can precisely navigate through the graph of connected nodes to locate information. The LlamaIndex documentation is here.

- **BM25:** A popular ranking function used by search engines to estimate the relevance of documents to a given search query. It’s based on probabilistic models and improves upon earlier models like TF-IDF (Term Frequency-Inverse Document Frequency). BM25 considers factors like term frequency and document length to provide a more nuanced approach to relevance scoring. It handles the issue of term saturation (where the importance of a term doesn’t always increase linearly with frequency) and length normalization (adjusting scores based on document length to prevent bias toward longer documents). BM25’s effectiveness in various search tasks has made it a standard in information retrieval.

- **Fusion Retrieval or Hybrid Search:** Combine keyword-based search (like tf-idf or BM25) with modern semantic or vector search. This approach takes into account both semantic similarity and keyword matching between the query and stored documents. The Reciprocal Rank Fusion algorithm can be used for reranking the retrieved results for the final output. Since both of these retrievers calculate a score, we can use the reciprocal rerank algorithm to re-sort our nodes without using additional models or excessive computation. Some info here on this.

&nbsp;

![Scientist](/images/advanced-rag/post-processing.jpg)

&nbsp;

### Post processing

A node postprocessor takes in a set of retrieved nodes and applies transformations, filtering or re-ranking logic to them.

**SimilarityPostprocessor:**

This module is designed to remove nodes that fall below a set similarity score threshold. It ensures that only nodes with a high degree of relevance or similarity are added to the context.
- **CohereRerank:** Reranking is a very popular way to increase the relevancy of you data set before passing it the the LLM. This module employs the “Cohere ReRank” functionality to reorder nodes, returning the top N nodes based on the re-ranking.

- **KeywordNodePostprocessor:** This postprocessor ensures the inclusion or exclusion of certain keywords. It filters nodes based on whether they contain specific required keywords and/or can exclude them.

- **MetadataReplacementPostProcessor:** This module replaces the node content with a field from the node’s metadata. It’s particularly useful when combined with the SentenceWindowNodeParser that is part of the big to small strategy outlined above.

- **LongContextReorder:** Recognising that models struggle with significant details in lengthy contexts, this module reorders retrieved nodes. It’s especially helpful in scenarios requiring a large top-k retrieval and will optimise the order of nodes.

- **SentenceEmbeddingOptimizer:** This postprocessor optimises token usage by removing sentences irrelevant to the query. It can work based on a percentile cutoff for top relevant sentences or a threshold cutoff for similarity.


### Response Synthesiser

A Response Synthesiser is what generates a response from an LLM, using a user query and a given set of text chunks. The method for doing this can take many forms, from iterating over text chunks to something more complex like building a tree. The main idea here is to simplify the process of generating a response using an LLM across your data. In LamaIndex you can set modes.

#### Modes:

**Refine Mode:**

Processes each retrieved text chunk sequentially, making separate LLM calls for each node. This is the default mode for a list index. The list of nodes is traversed sequentially and at each step, the query, the response so far and the context of the current node are embedded in a prompt template that prompts a LLM to refine the response to the query according to the new information in the current node. This mode is ideal for detailed answers.

- **Compact Mode (Default):** Similar to refine mode but compacts the chunks before processing, resulting in fewer LLM calls. This makes it a cheaper option. The response synthesiser adds as many nodes as possible into the context before hitting the LLM’t token limit. If there are too many nodes for one pass it will do many steps until complete.

- **Simple Summarise Mode:** Truncates text chunks to fit into a single LLM prompt, offering a quick summarisation solution. However you may lose some details due to truncation.

- **Tree Summarise Mode:** This uses a summary index and concatenates the chunks, then recursively processes the answers as chunks. This continues until one final answer remains. This mode is suitable for summarisation purposes, especially when dealing with multiple chunks.

- **Accumulate Mode:** Applies the query to each text chunk separately, accumulating the responses into an array and returns a concatenated string of all responses. This mode is beneficial when the same query needs to be run against multiple text chunks independently.

- **Compact Accumulate Mode:** Combines the features of accumulate and compact modes. It compacts each LLM prompt similarly to the compact mode and runs the same query against each text chunk.

### Evaluate

Evaluation and benchmarking arße crucial concepts in LLM development. To improve the performance of an LLM RAG app you must have a way to measure it. There are many techniques emerging but here are the main points to focus on.

**Component-Wise Evaluation:**
Focuses on assessing each part of the RAG system separately, particularly retrieval accuracy and relevance.
End-to-End Evaluation: Examines the entire RAG system, including the final response’s correctness and relevance. Best to start with to see how your whole pipeline is fairing.

**Create Ground Truth Datasets:**
This involves generating question-context pairs, either manually or synthetically. These will me ground truths that are specifically designed for testing and assessing the performance of the RAG system.

**Metrics for Evaluation:**
Correctness: Checks if the generated answer matches the ground truth answer.

**Semantic Similarity:**
Assesses semantic similarity to the ground truth answer.

**Faithfulness:**
Evaluates the answer’s faithfulness to the retrieved contexts so checking against the factual content of the source material

**Groundedness:**
Similar to above but groundedness would assess the extent to which the generated content can be traced back to specific information in the source material.

**Context Relevancy:**
Determines the relevancy of retrieved context in relation to the query.

**Answer Relevancy:**
Assesses the generated answer’s relevance in relation to the query.

**Guideline Adherence:**
Evaluates adherence to specific guidelines, like corporate identify, tone and behaviour.

**RAG Triad Framework (TruLens):**
This is one of many frameworks appearing. Trulens focuses on context relevance, groundedness, answer relevance and emphasises ‘honest, harmless, helpful’ criteria for evaluating LLM applications. Its worth a look here.

![Scientist](/images/advanced-rag/trulens.png)
Credit Trulens

LlamaIndex offers key modules to measure the quality of generated results and your RAG pipeline. You can learn more about how evaluation works in LlamaIndex in the module guides.

Fine tuning and Agents.
It would be wrong to leave out a mention on Fine-tuning and Agents. However they warrant their own articles so these will be covered in some next instalments.
