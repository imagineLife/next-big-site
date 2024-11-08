# Tensorflow
a library. Most commpnly written in python, but also available in several js libraries.  
- able to run on CPU and/or a GPU
- offer included deep-learning models via tensorflowhub
- can be used for several "steps" of a machine-learning "stack":
  - **wrangle/clean/pre-process** input data
  - **create machine-learning models** consisting of layers
  - **model input data** into neural-networks
  - **save machine-learning models** for use
  - **use machine learning models** in applications

## Processor Types
### TPU
a tensor processing unit.  
built by google.  

### GPU 
a graphics processing unit.  

most commonly used for image rendering.  
The speed and power of GPUs are often used in the machine-learning world.

### CPU
The traditional computational processing unit in computers.  

## Tensors
Here usually starts some math-specific jargon.  
Tensors are like arrays.  
A tensor is an "object", or "container" that stores data.  
The data has dimensions and tensors are often referred to as multi-dimensional.  
Tensors have [types](https://www.tensorflow.org/api_docs/python/tf/dtypes) based on the types of content stored in the tensor.  

## A Tensorflow Workflow
1. **Data-Prep**
2. **Model**: build a custom one, use a pre-trained one, use a pre-trained one to build a new customized model
  - **Fit** the model to the data
  - **Predict** what the input is based on the trained model
  - **Evaluate** the effectiveness of the trained model on some unseens data: improve through experimentation
3. **Save** the model
4. **Use** the model in an application


## Sidenote - Colab: A Helpful Tool
[Colab](colab.research.google.com) is an online platform that runs [jupyter notebooks](https://jupyter.org/): a nice way to tinker with some notebooks!


{/* ---
title: 'Tensorflow: an intro'
parentDir: tf
slug: tf/intro
author: Jake Laursen
excerpt: What is it?!
tags:
  [
    'machine learning',
    'models',
    'overview',
    'ai',
    'js',
    'javascript',
    'tensorflow',
  ]
order: 1
--- */}