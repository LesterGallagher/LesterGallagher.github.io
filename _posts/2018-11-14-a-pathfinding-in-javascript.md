---
title: A* Pathfinding in Javascript
date: 2018-11-14 14:19
image: "/uploads/download.png"
author: ''
description: A Star Search Algorithm on a grid in Javascript. A* Search is a best-first
  graph search algorithm. You can find a full codepen example below.
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''

---
Because we'll be using binary heaps (min heap) in this tutorial i would recommend [this tutorial](https://esstudio.site/2018/10/31/implementing-binary-heaps-with-javascript.html) on implementing binary heaps with javascript.

The code for the min heap is:

    // I'm using a "MinHeap" in this example. If you don't know what priority queues or binary trees are, checkout this article: https://esstudio.site/2018/10/31/implementing-binary-heaps-with-javascript.html
    
    class MinHeap {
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

Again if you don't understand something you can refer to [this blog post](https://esstudio.site/2018/10/31/implementing-binary-heaps-with-javascript.html).

Make sure the MinHeap class is a global variable or better, export the class if you're using commonjs or es6 modules.

```javascript
class GridPath {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.len = width * height;
        this.startI = null;
        this.goalI = null;
    }
}
```

When a new grid path is instantiated we set the width and height of the grid. Then we get the total number of cells/nodes and set it to the ".len" field. We also set the start node index and the goal node index to null. If the width and height are 10 for example, the grid will be laid out like this:

```javascript
[
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99
]
```

To recap. Every node on the grid has it's own index. There are two special nodes on the grid, the "start node" and the "goal node". We stored the indexes of these nodes.

Now we can start with the actual logic.

```javascript
// class GridPath {
// ...
	find(startI, goalI) {
        this.startI = startI;
        this.goalI = goalI;

        const closedSet = {}; // a set with all the indexes that we've processed

        const cameFrom = {}; // a set with indexes that point to the index of the node from where we came from.

        const gScore = {}; // a set with indexes that hold the current lowest cost (how many nodes away from the start according to the current closest path) to get to that node.
        gScore[startI] = 0; // set the gscore of the start index to zero, because it costs zero to get from the first node to the first node.

        const fScore = {}; // a set with indexes that hold the approximate distance or cost to get from that node to the goal. We need a function to approximate that distance which will be "this.heuristicCostEstimateSquared(aRandomNodeIndex, goalIndex)"
      
        const openSet = new MinHeap(index => fScore[index] || Infinity); // a minheap that holds all the nodes that need to be processed sorted based on the node's fScore.
        
      	fScore[startI] = this.heuristicCostEstimateSquared(startI, goalI); // we set the initial approximate distance from the goal.
        openSet.push(startI); // we push the start node index on the minheap.
  
  		// ...
	}
// }
```

The closed set holds a set with all the indexes that we've processed. The camefrom variable holds a set with indexes that point to the index of the node from where we came from. The gscore holds a set with indexes that hold the current lowest cost (how many nodes away from the start according to the current closest path) to get to that node. We set the gscore of the start index to zero, because it costs zero to get from the first node to the first node. The fscore holds a set with indexes and the approximate distance or cost to get from that node to the goal. We need a function to approximate that distance which will be "this.heuristicCostEstimateSquared(aRandomNodeIndex, goalIndex)". We do this for the first node we need to process which is the start node. Then we push this node onto the open set which is a minheap that holds all the nodes that need to be processed sorted based on the node's fScore.

The "heuristicCostEstimateSquared" function is implemented like this:

```javascript 
heuristicCostEstimateSquared(node1I, node2I) {
        return Math.pow(node2I % this.width - node1I % this.width, 2) 
            + Math.pow(Math.floor(node2I / this.width) - Math.floor(node1I / this.width), 2);
}
```

We simply use the "pythagoras theorem" to determine the approximate distance between nodes. You can optimize this function by not taking the square root because we don't need the actual distance. We just need to know if node A is closer then node B, so taking the square root is just useless overhead.

Next we start a while loop that continues untill there are no more nodes in the openSet. Hopefully we find a path before that happens otherwise we can be sure there's no valid path from the start node to the goal node.

```javascript
// class GridPath {
	// ...
	// find(startI, goalI) {
		// ...
		while(openSet.items.length > 0) {
            const currentI = openSet.pop();

            if (currentI === goalI) {
                // done
                return this.reconstructPath(cameFrom, currentI);
            }

            closedSet[currentI] = true;
            const neighboursI = this.neighboursI(currentI);

            for (let i = 0; i < neighboursI.length; i++) {
                const neighbourI = neighboursI[i];
                
                if (neighbourI < 0 || neighbourI > this.len || closedSet[neighbourI])
                    continue;

                const tentativeGscore = gScore[currentI] + 1;

                if (!fScore[neighbourI]) {
                    cameFrom[neighbourI] = currentI;
                    gScore[neighbourI] = tentativeGscore;
                    fScore[neighbourI] = tentativeGscore + this.heuristicCostEstimateSquared(neighbourI, goalI);
                    openSet.push(neighbourI);
                }
                else {
                    if (tentativeGscore >= gScore[neighbourI])
                        continue;
                    else {
                        cameFrom[neighbourI] = currentI;
                        gScore[neighbourI] = tentativeGscore;
                        fScore[neighbourI] = tentativeGscore + this.heuristicCostEstimateSquared(neighbourI, goalI);
                        // update openset
                        openSet.delete(neighbourI);
                        openSet.push(neighbourI);
                    }
                }
            }
        }
	// }
// }
```

Start by popping the closes node to the goal from the openSet. Then check if that node is the goal node, if so we've finished.

Else, we set the node's index on the closedSet. Marking it as discovered. Then we get all of the node's neighbours. We can get all of the indexes of the neighbours with this function:

```javascript
// class GridPath {
    // ...
    neighboursI(nodeI) {
      return [
        nodeI - this.width,
        nodeI + 1,
        nodeI + this.width,
        nodeI - 1,
      ]
    }
// }
```

Now we start looping over every neighbour. If the neighbour is in the closed set, we skip that node and continue. Then we set the tentative gscore of the neighbour to the gscore of the previous node plus one. If the neighbour is not in the fscore set we add the nieghbour with the heuristic cost estimate plus the tentaive gscore. Then we set the camefrom and gscore set, and we push the neighbour onto the open set. If the nieghbour is in the fscore set, we check if the current tentative gscore is lower then the previous gscore. If so we set it onto the camefrom, gscore and fscore sets. We also delete and push the neighbour to trigger the openset the resort the binary tree.

And we're done, we now only need to define the "reconstructPath(cameFrom, currentI)" function:

```javascript
// class GridPath {
    // ...
	reconstructPath(cameFrom, currentI) {
        let counter = 0;
        const path = [];
        path.push(currentI);
        while(currentI !== this.startI) {
            path.push(currentI);
            currentI = cameFrom[currentI];
            if (counter++ > 999999) return null;
        }
        path.push(this.startI);
        let nodesI = new Array(path.length);
        for(let i = 0; i < path.length; i++) {
            nodesI[i] = path[path.length - 1 - i];
        }
        return nodesI;
    } 
// }
```

Let's test the code:

```javascript

var dim = 51;
var lookup = document.getElementsByClassName('col-block');
var pathfinding = new GridPath(dim, dim);
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
window.addEventListener('mousemove', function (e) {
  var pos = getMousePos(canvas, e);
  var x = pos.x;
  var y = pos.y;
  if (x < 0 || y < 0 || x >= dim || y >= dim) return;
  var i = y * dim + x;
  var mi = Math.round(dim * dim * .5);
  var nodes = pathfinding.find(mi, i) || [];
  var bw = canvas.width / dim;
  var bh = canvas.height / dim;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var k = 0; k < nodes.length; k++) {
    ctx.fillRect(nodes[k] % dim * bw, Math.floor(nodes[k] / dim) * bh, bw, bh);
  }
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round((evt.clientX - rect.left - canvas.width / dim * .5) / canvas.width * dim),
    y: Math.round((evt.clientY - rect.top - canvas.height / dim * .5) / canvas.height * dim),
  };
}
```

<p data-height="265" data-theme-id="0" data-slug-hash="aQojMo" data-default-tab="js,result" data-user="Afirus" data-pen-title="Grid Pathfinding" class="codepen">See the Pen <a href="https://codepen.io/Afirus/pen/aQojMo/">Grid Pathfinding</a> by LesterGallagher (<a href="https://codepen.io/Afirus">@Afirus</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

{% include javascript_affiliate.html %}