---
layout: whitepaper
title: Hierarchical Data Modeling Through Projection in High Dimensional Space
short_title: Hierarchical Data Modeling
short_description: Understanding the hierarchy of flavor profiles
subtitle: The Deconstruction of a Product's Flavor
snippet: Using data pre-processing and principal component analysis, we were able to determine even minimal changes to perceived flavors in products.  By extracting which data is important for each model, the Gastrograph System’s variables can be made much more simple and calculations can be done more easily. Our models are very robust and able to work even with rapidly changing data sets and changing review structures.
tags: Decomposition Comparison RBF PCA Quality Control
date: 2014-08-04 19:11:00
author:
  - Nabeel Sarwar
  - Jason Cohen
description: Relating a Product's Flavor to Another
redirect_from:
  - /blogs/data/deconstruction-of-flavor-profile.html
  - /learn/whitepapers/deconstruction-of-flavor-profile.html
---

Every consumer has his or her own preferences. What is in our favorite drinks that sparks our euphoria? This momentous task is made greatly simpler by our unique sensory system, the Gastrograph. In detail, trained testers and ordinary consumers (with a bit of guidance) can easily map out what they love and hate in a particular product. Thanks to the Objective Flavor Profile (OFP), one can compare products and assess their similarities and differences on a scale of zero to five of increasing intensity for each of the twenty-four possible flavors.

What happens when two products have similar tastes but perform completely different in the market? The OFPs for such products can be compared to reveal differences. What about when a new product is released and is a similar style to a successful product? Is it possible to determine how similar it is to the successful product and where the differences are? The machinery to answer both questions is nearly the same. A quick, dirty model for this problem would be simple principal component analysis (PCA) with a simple application of dot products in \\(\mathbb{R}^{24}\\).

<!--more-->

Suppose that \\(\bf A\\) is a leading product  and that the producer of \\(\bf B\\) is interested in how his product differs from \\(\bf A\\). For the sake of simplicity, \\(\bf A\\) and \\(\bf B\\) are both of the same style; for example, if the products were beers, they could both be IPAs or Scotch Ales. In order to compare these two products, take a simple random sample of 100 reviews from each product to form a data matrix for each product of dimensions 100 x 24. Taking matrices \\(\mathbf{M\_A}\\) and \\(\mathbf{M\_B}\\), we can perform PCA on each matrix with the usual centering and covariance steps.

Principal component analysis aims at reducing the dimensionality of data. Typically, after the PCA step, we will take the principal components of \\(\mathbf{A}\\) and \\(\mathbf{B}\\)  that account for 80% to 90% of the variance. To further the dimensionality reduction, it is possible to also do sparse PCA. Lasso regression or elastic net would be useful here. This would be useful to see exactly what components in the principal components of the OFP are most prominent in the OFP of the products. R makes this particularly easy as you can just call the base `prcomp(x)` to perform PCA on the base matrix, and the scaling and centering is done without having to pre-process data.

Each review also comes with a *Perceived Quality* rating that indicates the subjective rating on a scale of one to seven, with seven being the best possible rating. With pre-processing, reviews with higher ratings could be given higher weight. This gives the benefit that Producer B can be given details on where Product A is succeeding in contrast with the best reviews of Product B. This weighting step could also be incorporated in the sparse PCA as an additional constraint when approximating to the principal components. The latter method would be more sensitive towards correlation between variables.

When reducing dimensionality, the focus should be on reducing the dimensionality of \\(\bf A\\). It is much more costly to compare the important bits of \\(\bf B\\) to the unimportant bits of \\(\bf A\\) than the comparing the unimportant bits of \\(\bf B\\) to the important components of \\(\bf A\\). In practice, not much difference was found in further reducing the dimensionality of \\(\bf B\\) beyond PCA.

Now that principal components of \\(\bf A\\) and \\(\bf B\\) have been extracted, we can use kernel methods (which will be explained shortly) on the principal components to measure similarity. In this case, it would be useful to have a similar number of components. Since
\\(\bf A\\) is the product of interest, if there are more \\(PC\_{B}\\) than \\(PC\_{A}\\), remove components until
either the modified \\(PC\_{B}\\) have reached a threshold of accounting only 80% of the variance in \\(\bf B\\) or both products have the same number of principal components. The same process should be done for the \\(PC\_{A}\\) if they outnumber \\(PC\_{B}\\), except the threshold for \\(PC\_{A}\\) should be around 85%, accounting for the slightly higher importance. In practice, this can usually be done as components near the end account for very little percentage of the variance. If at the end of this culling, there is still a number discrepancy of n principal components, reuse the the n principal components of the smaller set that represent the smallest variance. The error in these sections will likely be minimized in the analysis in the next segment. The remaining \\(PC\_{A}\\) and \\(PC\_{B}\\) will be called \\(PC\_{A-}\\) and \\(PC\_{B-}\\).

Now, how we do we account for how much variance a principal component has? If you are using a library, then often, the components and variation accounted for the components are listed respectively. If you are not using a library or feel daring enough to design your own, then after your center scale data, form your covariance matrix, and find the eigenvalues and eigenvectors. If you organize the eigenvalues from highest to lowest within the diagonal matrix and, of course, reorganize the eigenvalues in the same way, then the eigenvectors are your principal components, and the eigenvalues are the variation in the direction of the principal component. It is a simple singular value decomposition once you form the covariance matrix. Now, back to the issue of deciding on principal components to use...

A few notes on stability are in order. After the the principal components are isolated, the next step is to compare principal components. However, how dramatically do principal components change when new data is taken? What happens if \\(\bf A\\) releases a really bad couple of batches? A good similarity metric should be stable after a certain number of reviews. Fortunately, PCA is robust to these changes along the directions of high variation. There are few resources online that discuss this matter further and with much greater detail that could be allowed here.
The main take away is the first few principal components that correspond to the most variation and information in data will not change much unless the new data has substantial data in the direction of the principal components. The last few principal components can be highly unstable however, further validating the reasoning to cull \\(PC\_{X}\\) to \\(PC\_{X-}\\).

{% picture post-images post-images/1-hierarchical-08-04.png "In this image, there are 3 sets of data that can be fit into 3 ellipses. The major principal component is red, and the principal component accounting for less variation is blue. Using a polynomial kernel of degree one, detailed later in the article, the first ellipse and the second ellipse correspond to about 0.7 of the time. The first ellipse and third ellipse have nearly 0 correspondence."%}

After the PCA step, the reduced dimensionality of the data will make calculations less prone to error. The PCA also selects the important parts of \\(\bf A\\) and \\(\bf B\\), so kernel methods become easier to use in order to classify similarity. A kernel method is similar to an inner product in a higher dimensional space than the dot product. Many times, the standard dot product will miss higher dimensional correlation between variables.

Now that the PCAs are done, it is time to test out similarity between products. For this purpose, I am going to use a modified version of the dot product called the polynomial kernel. This is a modified version of the dot product that takes it to a higher dimensional space by taking the output of the dot product to a degree. In this case, I am going to take the degree to the 4th power. I will sum the dot products between respective members of \\(PC\_{A}\\) and \\(PC\_{B}\\) with a weight that is the midpoint between the perspective \\(\phi\_{k}\\), the proportion of variation that the \\(k^{th}\\) component in \\(PC\_{X-}\\) accounts for in \\(\bf X\\). For clarity, this would be: \\[\sum\limits\_{i}^n\frac{(phi\_{Ai} + phi\_{Bi})}{2} (\vec{A\_{i}} \cdot \vec{B\_{i}})^4\\] Now, the values closer to one will usually correspond to good similarity. Once you have a measure of how similar two products are, then you can do some pretty interesting stuff, like trying to make your product similar to a product that is doing well in the market and in the same style as yours, or trying to differentiate from a competing product.

This is a simplified model which still leaves a lot to be desired. Our actual model is robust to changes in review structure and rapid variations of data. This model also lacks pre-processing of the principal components, instead using pure heuristics which could be formalized using optimization techniques like gradient descent combined with weights. Finally, in this simple model, the degree of the polynomial kernel does not undergo cross validation, and the choice of the degree for the polynomial kernel does not have any underlying theoretical reason.

If you think you could improve this model, or want to try your hand at implementing quality control for the worlds best producers, we invite you to join our growing team!

If you’re a producer of beer, coffee, or spirits who wants to benefit from quality control, sign up for our 31 day free trial [here][trial-link]. If you’re a data scientist passionate about craft products and applying data science to human sensory data, check out our openings [here][hire].


[trial-link]: /pricing.html
[hire]: /jobs.html
