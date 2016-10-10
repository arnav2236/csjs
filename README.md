# Computer Science in JavaScript

Small collection of basic CS Algorithms/Data Structures in JavaScript.

[Live Demos](https://nem035.github.io/csjs/)

This project started out by me wanting to play around with [CSS variables](https://github.com/nem035/csjs/blob/gh-pages/css/style.css#L5) but then I just went bananas and wrote some algorithms.

If you're interested in these topics, definitely checkout the [much better version](https://github.com/nzakas/computer-science-in-javascript/) of this project.

Equally recommended is the awesome [Algorithm Visualizer](algo-visualizer.jasonpark.me).

## Algorithm Implementation/Optimization Hints

- BubbleSort (`do/while`, no need to go past the last swapped element)
- InsertionSort (we can stop searching as soon as we find insertion point)
- MergeSort (we can merge left and right subarrays in-place)
- QuickSort (we can set the pivot as the median of the first, middle and last element)

## Generic Optimization Hints

- Make sure not to (unnecessarily) revisit already visited data.

## Libraries used

- [Ace](https://github.com/ajaxorg/ace)
- [jQuery](https://github.com/jquery/jquery)
