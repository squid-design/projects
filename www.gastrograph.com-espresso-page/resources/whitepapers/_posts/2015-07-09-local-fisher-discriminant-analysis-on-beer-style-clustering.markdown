---
layout: whitepaper
title: Local Fisher Discriminant Analysis on Beer Style Clustering
short_title: LFDA on Beer Style Clustering
subtitle: Beer style clustering
description: LFDA and Kernel LFDA are applied to beer flavor data in order to cluster by beer style.
short_description: Clustering beer flavor data by beer style
snippet:  In this paper, LFDA as well as a non-linear version of LFDA called Kernel LFDA are introduced. We apply these methods for beer style clustering with 3-D visualization of metric transformed beer data and then illustrate some comparisons of metric learning to standard statistical sensory methods.
tags: LFDA Kernel-LFDA metric-learning supervised
date: 2015-07-09 13:42:13
author:
  - Yuan Tang
  - Jason Cohen
---
####Abstract

At Analytical Flavor Systems, we apply various metric learning methods to perform pre-processing.  LFDA (Local Fisher Discriminant Analysis) is one of the best-performing supervised dimensionality-reducing metric learning method among the others. It automatically learns an appropriate transformation matrix to capture the characteristics of the original data, including possible multimodality of the existing clusters. In this paper, LFDA as well as a non-linear version of LFDA called Kernel LFDA are introduced. We apply these methods for beer style clustering with 3-D visualizations of metric-transformed beer data and then illustrate some comparisons of metric learning to standard statistical sensory methods.

<!--more-->

##1. Motivation

Traditionally, when dealing with data with attributes in different scales, one will have to center and scale the data set so that each attribute plays an equal role in the following data science analysis and model building. However, certain features can be more important than others when performing different tasks. For example, in the context of facial recognition, attributes collected from around the face will be more important than those collected from the clothes, body positions, etc. Then comes the necessity of supervised scaling for different attributes.

In Analytical Flavor Systems, we have beer sensory data that comes from our mobile app from many different reviewers. Each sensory review contains 24 flavor attributes such as sugar, bitterness, spices, etc. If we want to perform a classification on beer styles, we'll have to generate different scaling standards on those different flavor attributes since, for some styles, certain flavors are more important than others.

<strong>Metric learning</strong> comes in handy in this situation, which learns a distance function tuned to a particular task. One of the metric learning algorithms we are using is called <strong>local Fisher discriminant analysis (LFDA)</strong>, which performs supervised learning of a transformation/distance matrix that can be used to transform the original data set according to its learned metrics for different attributes - in our case, the 24 flavor attributes.

##2. Introduction

<strong>Fisher discriminant analysis (FDA)</strong> is a popular choice to reduce the dimensionality of the original data set. It maximizes between-class scatter and minimizes within-class scatter. It works really well in practice, however, lacks some considerations for <strong>multimodality</strong>. Multimodality is within many applications, such as disease diagnosis, where there may be multiple causes for a particular disease. In this situation, FDA cannot capture the multimodal characteristics of the clusters. To deal with multimodality, <strong>local-preserving projection (LPP)</strong> plays a major role in preserving the local structure of the data. It keeps nearby data pairs in the original data space close in the embedding space so that multimodal data can be embedded and its local structure will not be lost.

Later on, a new dimensionality reduction method called <strong>local Fisher discriminant analysis (LFDA)</strong> was proposed to combine both advantages of FDA and LPP in a way that between-class separability is maximized while within-class separability is minimized and its local structure is preserved. Furthermore, by the help of <strong>kernel trick</strong>, LFDA can also be extended to deal with non-linear dimensionality reduction situations. We will discuss both methods in this paper.

##3. Theoretical Background
####3.1 Fisher Linear Discriminant

Let <span>\\(S^{(w)}\\)</span> and <span>\\(S^{(b)}\\)</span> be the <em>within-class scatter matrix</em> and the <em>between-class scatter matrix</em> defined by the following:

<div>$$S^{(w)}=\sum_{i=1}^{l}\sum_{j:y_{j}=i} (x_{j}-\mu_{i})(x_{j}-\mu_{i})^{T}$$</div>

and

<div>$$S^{(b)}=\sum_{i=1}^{l}n_{i} (\mu_{i}-\mu)(\mu_{i}-\mu)^{T},$$</div>

where <span>\\(\mu_{i}\\)</span> is the mean of samples in the class <span>\\(i\\)</span> and <span>\\(\mu\\)</span> is the mean of all samples, such that:

<div>$$\mu_{i}=\frac{1}{n_i}\sum_{j:y_{j}=i}x_{j},$$</div>

<div>$$\mu=\frac{1}{n}\sum_{i=1}^{n}x_{i}.$$</div>

The FDA transformation matrix, denoted as <span>\\(T_{FDA}\\)</span>, is defined as follows:

<div>$$T_{FDA}=argmax_{T\in \mathbb{R}^{d\times m}}((T^{T}S^{(w)}T)^{-1}T^{T}S^{(b)}T).$$</div>

In other words, <span>\\(T\\)</span> is found so that between-class scatter is maximized and within-class scatter is minimized. In order to optimize this, <span>\\(T_{FDA}\\)</span> can be found by the following:

<div>$$T_{FDA}=(\phi_{1}|\phi_{2}|\cdots|\phi_{m}),$$</div>

where <span>\\(\\{\phi\_{i}\\} \_{i=1}^{d}\\)</span> are the generalized eigenvectors associated to the generalized eigenvalues <span>\\(\lambda\_{1}\geq \lambda\_{2} \geq \cdots \geq \lambda\_{d}\\)</span> of the generalized eigenvalue problem:

<div>$$S^{(b)}\phi = \lambda S^{(w)}\phi.$$</div>

####3.2 Locality-Preserving Projection

Let <span>\\(A\\)</span> be the <em>affinity matrix</em> where its <span>\\((i,j)\\)</span>-th element is the affinity between two points <span>\\(x\_{i}\\)</span> and <span>\\(x\_{j}\\)</span>. The elements in <span>\\(A\\)</span> are larger if two points are close to each other. We define <span>\\(A\_{i,j}=1\\)</span> if <span>\\(x\_{j}\\)</span> is the <span>\\(k\\)</span>-nearest neighbor of <span>\\(x\_{i}\\)</span> or vice versa while <span>\\(A\_{i,j}=0\\)</span> otherwise. The <em>LPP transformation matrix</em> can then be defined as the following:

<div>$$T_{LPP}=argmin_{T\in \mathbb{R}^{d\times m}}\frac{1}{2}\sum_{i,j=1}^{n}A_{i,j}||T^{T}x_{i}-T^{T}x_{j}||^{2}$$</div>

subject to

<div>$$T^{T}XDX^{T}T=I,$$</div>

where <span>\\(D\\)</span> is the diagonal matrix with <span>\\(i\\)-th</span> diagonal element being

<div>$$D_{i,i}=\sum_{j=1}^{n}A_{i,j}.$$</div>

In other words, <span>\\(T\_{LPP}\\)</span> is found such that nearby data pairs in the original data space are kept close in the embedding space. <span>\\(T\_{LPP}\\)</span> is given by

<div>$$T_{LPP}=(\phi_{d-m+1}|\phi_{d-m+2}|\cdots|\phi_{d}),$$</div>

where <span>\\(\\{\phi\_{i}\\}\_{i=1}^{d}\\)</span> are the eigenvectors associated to the eigenvalues <span>\\(\lambda\_{1}\geq \lambda\_{2} \geq \cdots \geq \lambda\_{d}\\)</span> of the following eigenvalue problem

<div>$$XLX^{T}\phi=\lambda XDX^{T}\phi,$$</div>

where

<div>$$L=D-A.$$</div>

####3.3 Local Fisher Discriminant Analysis

Let us combine the concepts for both FDA and LPP to define our local Fisher discriminant analysis. A <em>local</em> within-class scatter matrix

<div>$$S^{(w)}=\frac{1}{2}\sum_{i,j=1}^{n}W_{i,j}^{(w)}(x_{i}-x_{j})(x_{i}-x_{j})^{T},$$</div>

<div>$$S^{(b)}=\frac{1}{2}\sum_{i,j=1}^{n}W_{i,j}^{(b)}(x_{i}-x_{j})(x_{i}-x_{j})^{T},$$</div>

where

<div>
$$
W_{i,j}^{(w)}=
\left\{
  \begin{array}{ll}
    A_{i,j}/n_{l}  & \mbox{if } y_{i}=y_{j}=l, \\
    0 & \mbox{if } y_{i}\neq y_{j},
  \end{array}
\right.
$$
</div>

<div>
$$
W_{i,j}^{(b)}=
\left\{
  \begin{array}{ll}
    A_{i,j}(1/n-1/n_{l})  & \mbox{if } y_{i}=y_{j}=l, \\
    1/n & \mbox{if } y_{i}\neq y_{j}.
  \end{array}
\right.
$$
</div>

Intuitively, we use the above equations to weight the values for each pair of samples that belong to the same class. Namely, for sample pairs that are far apart from each other in the same class, we give less weight/influence on the two local scatter matrices.

The LFDA transformation matrix <span>\\(T\_{LFDA}\\)</span> is then defined as the following:

<div>$$T_{LFDA}=argmax_{T\in \mathbb{R}^{d \times r}}\left[ tr((T^{T}S^{(w)}t)^{-1}T^{T}S^{(b)}T)\right]$$</div>

In other words, the transformation matrix <span>\\(T\_{LFDA}\\)</span> is found so that data pairs that are near each other in the same class become closer and data pairs in different classes become far away from each other. Note that data pairs in the same class that are far away from each other do not come closer.

In order to efficiently compute this LFDA transformation matrix, one can look into the references in the last section of the paper.

####3.4 Kernel LFDA

LFDA can be <em>non-linearized</em> by the <em>kernel trick</em>, which enables the algorithm to operate in a high-dimensional feature space but avoids computing the coordinates of the data in that space. It works by computing the inner products between all pairs of data in the feature space. Kernel trick also greatly reduces the costs of computation of the coordinates.

One particular choice of kernel function is the Gaussian kernel defined as the following:

<div>$$K(x,x')=exp(-\frac{||x-x'||^{2}}{2\sigma ^{2}}),$$</div>

with <span>\\(\sigma>0.\\)</span> <span>\\(K\\)</span> is now the <em>kernel matrix</em> where its <span>\\((i,j)\\)</span>-th element is given by

<div>$$K_{i,j}=<\phi(x_{i}),\phi(x_{j})>=K(x_{i},x_{j}),$$</div>

which we then use to perform the regular LFDA.

##4. Example Results in Beer Data

Below is a 3D plot for the metric-transformed beer data using LFDA. Note that in order to make the visualization intuitive, we've reduced the dimension to three. Each color represents a distinct style of beer. Note that it's really hard to transform the beer data into linearly separable regions, at least not separable within three dimensions. Empirically, it's very hard to separate data with high dimensions (about 28 different attributes) into clusters in low dimensions, even with the magic of LFDA since the relationships are clearly not simply linear. It's not easy to visualize the effect of LFDA within only 3 dimensions here but it's proven to greatly improve the accuracy of machine learning models in our company.

{% image post-images post-images/whitepapers/beer-style-clustering/1.png "Figure 1: 3D plot for the metric-transformed beer data using LFDA." %}

The next plot is 3D visualization for the metric-transformed beer data using KLFDA. Each color represents a different style with the style name as the label. Note that the clusters for each different style are well separated non-linearly.

{% image post-images post-images/whitepapers/beer-style-clustering/2.png "Figure 2: 3D plot for the metric-transformed beer data using KLFDA." %}

##5. Comparisons to Standard Statistical Sensory Methods

Many other statistical methods are currently being used in food sensory research, such as studies in evaluating flavor, texture, flavor release, chemical senses, etc. The most popular one in practice is <em>principal components analysis</em> (PCA), which is a statistical method that groups correlated variables into a new variable, called <em>a principal component</em>, in place of the original variables, in order to reduce dimensions of the original data set while maintaining the characteristics of the original data features. However, PCA does not preserve the multimodality of the original data set. For example, in order to classify beer styles even for beer that is flawed/contaminated by different causes, PCA will transform the original data set that might tend to interpret the flawed beer data into a different style instead.

Fortunately, as we explained earlier, metric learning methods, particularly LFDA, preserves multimodality of the data. Intuitively, it keeps the data points that belong to the same styles close to each other while maintaining the local multimodality structure -- beer data that are contaminated by different flawes are still kept in different sub-clusters with some distance.

Additionally, in practice PCA sometimes generates bad principal components that cannot explain a great amount of variance in the original data set. For example, if the original data set has 6 dimensions and we reduce the dimension to 3 using PCA, the resulting 3 principal components might not capture some important features and variance in the original data features. Using this result from PCA sometimes lead to very bad accuracy for machine learning models due to the poor pre-processing that losses a lot of the essential information in the original data features. On the other hand, metric learning methods such as LFDA, in particular, can, surprisingly, enhance the distinctive characteristics of the original data set and pull data points that have similar characteristics close to each other.

Furthermore, PCA normalizes the original data features to a common scale. Dijksterhuis explored the PCA approach in greater detail by studying time-intensity bitterness curves (Dijksterhuis, 1993). He noted that PCA was not discriminating of different bitter stimuli. If dimension reduction are being performed based on a common scale, some important stimuli will have the same amount of effect on producing bitterness.

##6. Significance and Future Goals

Metric learning methods, especially LFDA and KLFDA included in this papar, can be very useful when it comes to dimension reduction, visualization, de-noising, and pre-processing for data in many domains - in particular computer vision and signal processing. It's also proven to greatly improve the accuracy for beer flaw detection in our company.

However, these methods are rather supervised in the sense that they are based on the known class labels. In the future, we will keep experimenting and applying these methods on other data sets for different tasks. We will also try to explore and implement other metric learning methods, especially unsupervised metric learning methods. Unsupervised methods are preferred because some style labels are labeled incorrectly by producers in a sense that those labels don't reflect the real flavors of the beer.

##7. References

  * Dijksterhuis, Garmt B. "Principal Component Analysis of Time-Intensity Bitterness Curves1." Journal of Sensory Studies 8.4 (1993): 317-328.

  * Sugiyama, Masashi, and Gatsby Tea Talk. "Local fisher discriminant analysis." (2006).

  * Sugiyama, Masashi. "Dimensionality reduction of multimodal labeled data by local fisher discriminant analysis." The Journal of Machine Learning Research 8 (2007): 1027-1061.