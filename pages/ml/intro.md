## Machine Learning

### Common Terminology

**Model**: a function. The function takes input, which is the data we want the machine to learn about. The model runs computations on the data and produces an output with probabilities.

**Weights**: How important each feature is, of the input dataset. Weights get adjusted throughout the training process by the machine.

**Labels**: A description, typically one-word, given to each piece of data that is fed to the model. Photos might be labeled "dog", "cat", "Joe", "GarbageTruck", etc.

**Machine Learning Algorithms**: Specific computation types to the machine-learning world: CNN (convolutional neural-networks), Naive Bayse, LSTM (Long Short Term Memory), and more.

**Overfitting**: Training the model to predict with "too high" a certainty. This is bad because the model will only learn the data from the input, and not perform well with "new" input that is not 100% like the input.

**Supervised Learning**: Giving a machine a "labeled" dataset & the machine correlates labeled input to the labels. We the people building machine learning are supervising the learning that the machine is doing by instructing the machine what labels should be deducted from the input.

**Unsupervised Learning** Giving a machine a dataset without labels & having the machine "figure out" its own labels and learnings.

**Semi-Supervised Learning** is when some of the data given to the machine is labeled and other data given to the machine is not labeled.

**Pre-Trained Models**: Many models are already trained and available for free use. [kaggle](https://www.kaggle.com/models), [tensorflow](https://github.com/tensorflow/tfjs-models) and [huggingface](https://huggingface.co/models) are three places to start to checkout some pre-trained models. Machine learning is significantly more common in python environments than javascript at the moment: there are likely significantly more models for a python env than a js env.

**Transfer Learning**: Using a pre-trained model for NEW trained details. Check out [teachable machine](https://teachablemachine.withgoogle.com/train) for an in-browser GUI-driven approach to using pre-trained models to try out some transfer learning!
