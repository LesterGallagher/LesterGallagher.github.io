---
title: Implementing Binary Heaps with Javascript
date: 2018-10-31 16:23:28 +0000
image: "/uploads/binaryheap.png"
description: A heap tree is a type of data structure where the each node is either
  greater than or equal or less than or equal to the node's children. Binary heaps
  are often used to implement priority queues.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''
author: ''

---
A heap tree is a type of data structure where the each node is either greater than or equal or less than or equal to the node's children. Binary heaps are often used to implement priority queues. Priority queues are used in pathfinding for example.

Even though it might sound like a difficult subject it's actually not that difficult. We will start by establishing some basics. The first one being that a node will always be equal to or smaller than it's children. This means that the smallest value is always on top (the root node). The reason that a binary heap is so fast compared to sorting arrays, is that everytime we add or delete an item, we "sort" the heap. This heap "sorting" is very fast because we only need to check the parent node if it's bigger than the child. As the tree grows exponentially the time to sort the heap does not (grow exponentially). This is called time complexity, which is "O(log n)" for heap insertion and deletion. Binary heaps can perform very well with very large data-sets compared to other algorithms.

            6
          /   \
         7    12
        / \   /
       10 15 17

{% include adsense.html %}

We can implement a heap in two different ways:

#### First - Object reference implementation:
<p></p>
```javascript
var node1 = { val: 6, parent: null };
var node2 = { val: 7, parent: node1 };
var node3 = { val: 12, parent: node1 };
var node4 = { val: 10, parent: node2 };
var node5 = { val: 15, parent: node2 };
var node6 = { val: 17, parent: node3 };
```

#### Second - Array implementation

This might seem strange but we can easily represent a binary heap as an array.

```javascript
var tree = [6,7,12,10,15,17];
```

The first element in the array is the root node. The left child is the second item and the right child is the third item, etc.

To navigate the array we use these rules:

* The left child is located at (index + 1) * 2 - 1
* The right child is located at (index + 1) * 2
* The parent child is located at Math.floor((i + 1) / 2 - 1)

For example if we have a node located at index 7, we know that it's left child is located at `15 = (7 + 1) * 2 - 1`, the right child is located at index `16 = (7 + 1) * 2` and the parent is located at index `3 = Math.floor((7 + 1) / 2 - 1)`. If you're still struggling with how binary trees work, you can checkout [this article](https://www.cs.cmu.edu/\~adamchik/15-121/lectures/Binary%20Heaps/heaps.html) by Carnegie Mellon University which helped me out a lot.

{% include adsense.html %}

Using these rules we can write the following code:

```javascript
class MinHeap extends Heap {
    constructor(selector) {
        this.items = [];
        this.selector = selector;
    }
  
  	seek() { return this.items[0]; }

    push(item) {
        let i = this.items.length;
        this.items.push(item);
        while (i > 0 && this.selector(this.items[Math.floor((i + 1) / 2 - 1)]) > this.selector(this.items[i])) {
            let t = this.items[i];
            this.items[i] = this.items[Math.floor((i+1)/2-1)];
            this.items[Math.floor((i+1)/2-1)] = t;
            i = Math.floor((i + 1) / 2 - 1);
        }
    }

    pop() {
        if (this.items.length <= 1) return this.items.pop();
        const ret = this.items[0];
        this.items[0] = this.items.pop();
        let i = 0;
        while (true) {
            let lowest = this.selector(this.items[(i + 1) * 2]) < this.selector(this.items[(i + 1) * 2 - 1]) 
                ? (i + 1) * 2 : (i + 1) * 2 - 1;
            if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {
                let t = this.items[i];
                this.items[i] = this.items[lowest];
                this.items[lowest] = t;
                i = lowest             
            } else break;
        }
        return ret;
    }

    delete(item) {
        let i = this.items.indexOf(item);
        // heapify
        this.items[i] = this.items.pop();
        while (true) {
            let lowest = this.selector(this.items[(i + 1) * 2]) < this.selector(this.items[(i + 1) * 2 - 1]) 
                ? (i + 1) * 2 : (i + 1) * 2 - 1;
            if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {
                let t = this.items[i];
                this.items[i] = this.items[lowest];
                this.items[lowest] = t;
                i = lowest             
            } else break;
        }
    }

    heapify(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.push(arr[i]);
        }
    }
}
```

To create a max heap, where the child nodes are always smaller than or equal to the parent, we can change it do this:

```javascript
class MaxHeap extends Heap {
    constructor(selector) {
        this.items = [];
        this.selector = selector;
    }
  
  	seek() { return this.items[0]; }

    push(item) {
        let i = this.items.length;
        this.items.push(item);
        while (i > 0 && this.selector(this.items[Math.floor((i + 1) / 2 - 1)]) < this.selector(this.items[i])) {
            let t = this.items[i];
            this.items[i] = this.items[Math.floor((i+1)/2-1)];
            this.items[Math.floor((i+1)/2-1)] = t;
            i = Math.floor((i + 1) / 2 - 1);
        }
    }

    pop() {
        if (this.items.length <= 1) return this.items.pop();
        const ret = this.items[0];
        // heapify
        this.items[0] = this.items.pop();
        let i = 0;
        while (true) {
            let lowest = this.selector(this.items[(i + 1) * 2]) > this.selector(this.items[(i + 1) * 2 - 1]) 
                ? (i + 1) * 2 : (i + 1) * 2 - 1;
            if (this.selector(this.items[i]) < this.selector(this.items[lowest])) {
                let t = this.items[i];
                this.items[i] = this.items[lowest];
                this.items[lowest] = t;
                i = lowest             
            } else break;
        }
        return ret;
    }

    delete(item) {
        let i = this.items.indexOf(item);
        // heapify
        this.items[i] = this.items.pop();
        while (true) {
            let lowest = this.selector(this.items[(i + 1) * 2]) > this.selector(this.items[(i + 1) * 2 - 1]) 
                ? (i + 1) * 2 : (i + 1) * 2 - 1;
            if (this.selector(this.items[i]) < this.selector(this.items[lowest])) {
                let t = this.items[i];
                this.items[i] = this.items[lowest];
                this.items[lowest] = t;
                i = lowest             
            } else break;
        }
    }

    heapify(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.push(arr[i]);
        }
    }
}
```

This basic implementation only implements push, pop and delete, but most of the time this is all you need.

{% include adsense.html %}

We can visualize the tree using the following html and javascript:

```html
<input type="number" id="val" placeholder="value"></input>
<button id="push">Push</button>
<button id="pop">Pop</button>

<canvas id="heap-visualization" width="600" height="280"></canvas><br>
```
<p></p>
```javascript
const heap = new MinHeap(x => x);
heap.heapify([1, 0, 4, 6, 5, 9, 7, 2, 3, 8]);

const ctx = document.getElementById('heap-visualization').getContext('2d');
visualize(ctx, heap.items);

document.getElementById('push').addEventListener('click', function() {
  var val = +document.getElementById('val').value;
  if (isNaN(val)) return alert('Value is not a number');
  heap.push(val);
  visualize(ctx, heap.items);
}); 

document.getElementById('pop').addEventListener('click', function() {
  heap.pop();
  visualize(ctx, heap.items);
}); 
```

## Full example

The [Codepen](https://codepen.io/Afirus/pen/JmQZeq) below shows the full example, visualization and code.

<p data-height="434" data-theme-id="0" data-slug-hash="JmQZeq" data-default-tab="js,result" data-user="Afirus" data-pen-title="JmQZeq" class="codepen">See the Pen <a href="https://codepen.io/Afirus/pen/JmQZeq/">JmQZeq</a> by LesterGallagher (<a href="https://codepen.io/Afirus">@Afirus</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

An example of using a heap with pathfinding can be found [here](https://esstudio.site/maze-solver). It searches the shortest route from A to B. A min-heap is used as a priority queue in the [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm).

{% include javascript_affiliate.html %}