---
title: 'Understanding Foundation Models and Their Impact on Domain-Specific Tasks'
publishedAt: 'January 7, 2024'
description: 'For domain specific tasks should we fine-tune a foundation model or build a new traditional model from scratch?'
coverImage: '/images/foundation-models/scientist.jpg'
---

![Scientist](/images/foundation-models/scientist.jpg)

&nbsp;

---

For domain specific tasks should we fine-tune a foundation model or build a new traditional model from scratch?

### Traditional modelling.

Before foundation models, machine learning was predominantly about creating task-oriented models. These models were designed for specific purposes and they have a few key characteristics:

- **Specialised Training:** Task-oriented models are trained on a smaller datasets for a particular task. They are specialised and do not have knowledge outside the realm of the dataset.

- **Limited Scope of Application:** Because they are highly specialised they are only good for the tasks they were trained for.

- **Data Dependency:** They require well-labeled datasets for their specific task. The quality and quantity of this training data directly affected the model’s performance.

- **Manual Feature Engineering:** In many cases, these models require a lot of human effort in the area of feature engineering. It demands not only domain expertise but also extensive experimentation to determine the most effective features for a given model, making it a time-intensive and a skill-dependent task.

- **Scalability Issues:** Deploying these models and scaling them across these different tasks means starting from scratch with new data each time. i.e if you have a model doing one task you can’t just use it for another task without retraining it on new data, so basically you need to start from scratch.

### Foundation models.

Foundation models are a class of AI model characterised by their extensive training on large diverse datasets, enabling them to develop a wide understanding of various subjects and contexts. This comprehensive training makes them versatile and adaptable to a variety of applications outside the scope of their training.

One class of foundation model is a Large language model (LLM). Trained on a large corpus of text they can be fine tuned to become task-oriented. For example they could be used for sentiment analysis, where a sentence is submitted and the sentiment of that sentence returned. While LLMs specifically deal with language data, foundation models can encompass other domains as well such as vision or audio.

Foundation models aim to replace the traditional way of modelling with a single model capable of handling various tasks. Trained on vast amounts of unsupervised, unstructured data they have the ability to adapt to various tasks.

So while the end result of having a model perform a specific task is similar to the traditional way of creating task-specific models, the methodology and efficiency are different. Foundation models offer a more scalable and flexible approach, as they can be adapted to multiple tasks without the need to start the development process from the beginning for each new task.

&nbsp;

![megaphone-the-words.jpg](/images/foundation-models/megaphone-the-words.jpg)

&nbsp;

_So how do we make foundation models task orientated?_

### Making foundation models Task-Oriented:

- **Fine-Tuning:** This involves retraining the last layers of the neural network with a task-specific dataset. For example, you can use a dataset based on legal document analysis or medical research summaries in the fine-tuning phase. So in this case the original foundation model like a LLM, already knows about language and how to have a conversation. We fine-tune on top of this for it to become an expert in a specific domain. Your result will be a domain specific model in either the legal or the medical domain that you can have a conversation with.

- **Adaptability with less data:** Because the foundation model already has a rich understanding of the data and context, it requires less task-specific data to become effective at the new task, compared to building a task-specific model from scratch.

- **Efficiency:** The fine-tuning process is also more efficient than traditional training because it again leverages the extensive pre-training. It reduces the need for extensive data collection, labelling and complex feature engineering specific to the task.

_So what are the pros and cons of fine tuning a foundation model over building a traditional model?_

&nbsp;

![futurism-and-technology.jpg](/images/foundation-models/futurism-and-technology.jpg)

## Pros.

- **Performance:** Foundation models generally have better performance due to being trained on a wider and diverse dataset. The performance gain from these models is due to their ability to generalise across a very broad range of tasks.

- **Productivity Gains:** Because foundation models reduce the need to be fine-tuned on large amounts of data, they achieve good performance on specific tasks, even when using smaller, more focused datasets. This means there is a reduced need for extensive task-specific data collection and labelling.

- **Scalability and Flexibility:** The ability to apply a single foundation model to multiple tasks makes it a scalable and flexible solution. This is great for diverse application domains where we can offer a single model solution for these various use cases.

- **Data Efficiency:** Because these models can work effectively in low-data scenarios, it can be beneficial for tasks where labeled data is scarce or expensive to obtain. In real-world scenarios ideal, large and cleanly labeled datasets are sometimes not available. Foundation models have the ability to work with what is available, even if it’s limited or not labeled perfectly and therefore makes them more practical and adaptable to real-world applications.

## Cons.

- **Compute Cost for Fine-Tuning:** While less resource-intensive than initial training, fine-tuning foundation models can still be computationally expensive. It requires significant processing power and time. High cost can be a barrier to entry for smaller or resource limited organisations.

- **Cost of Inference:** Running these models, in production, for inference is at present resource-intensive. They often require powerful hardware like multiple GPUs, which increases costs even more.

- **Trustworthiness:** Since foundation models are trained on vast quantities of unfiltered data from the internet there is a risk of incorporating biases, inaccuracies and harmful or toxic content into the model. This raises concerns about the reliability and ethical implications of their outputs and is an increasingly important consideration.

- **Ethical and Societal Implications:** The risks associated with these biases bring ethical considerations when deploying these models, especially considering their potential impact on decision-making processes along with the broader society.

Overall, while foundation models offer significant advantages in terms of performance and versatility, they also bring many challenges.

It is also important to recognise that foundation models extend beyond the realm of language processing. Also, some are trained with a greater emphasis on specific data types and therefore the model develops a more nuanced understanding of various domains.

&nbsp;

![various-applications.jpg](/images/foundation-models/various-applications.jpg)

&nbsp;

Some other applications of foundation models.

- **Vision:** Models like DALL-E 2 generate images from text prompts.

- **Code:** Models for code completion are trained to take in natural language and output code.

- **Chemistry:** Models for molecule discovery help in the identification and creation of new molecular structures for things like drug discovery, material science, and more. They can also predict properties of molecules, simulate their reactions and suggest new compounds.

- **Climate Change:** Geospatial data models for climate research are trained on diverse data sources, including satellite imagery, geographic information system (GIS) data, climate patterns.

&nbsp;

The shift towards foundation models represents a significant change in the traditional approach. Foundation models are designed to be more general-purpose, trained on vast and varied datasets. They can be adapted with fine-tuning to perform a wide range of tasks, reducing the need for specialised models for each task and offering more flexibility and scalability.

However, there are pros and cons and with the ever changing AI landscape, we can imagine that smaller, faster and cheaper will be the focus of these foundation models going forward.
