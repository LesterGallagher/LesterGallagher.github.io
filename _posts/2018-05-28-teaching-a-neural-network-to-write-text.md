---
title: Teaching a Neural Network to write text
date: 2018-05-28 15:44:07 +02:00
layout: post
image: "/uploads/teaching-a-neural-net-how-to-code-visualization.png"
---

A simple neural network that writes letters using [synaptic](https://github.com/cazala/synaptic) and [jimp](https://github.com/oliver-moran/jimp) in pure javascirpt.

# [Checkout a working example below](#nn-example-text-writer)

{% gist 26afb76d0bee8ec00dff89946901ed0e/b5c23bb621fe6bf75b4c2461b1d5c28df8b9245a %}
I will be running the code in the browser but you are free to use Node.js. We need to include two libraries: [Jimp](https://github.com/oliver-moran/jimp) and [Synaptic](https://github.com/cazala/synaptic). 
{% gist ba2beef73f2545aafbc0f68e69dcd720/91fda2ab12eb89e11a1190f16a36fe0e3f592804 %}
We will be using the Architect and the Trainer from synaptic.js to create our neural network. If you are using Node.js, you will also have to require Jimp. Next create the "catagorical" helper function. This will transform a letter to a valid input for the neural network. For example: 1(B) => [ 0, 1, 0, 0, ..., 0 ]. 

{% gist ba2beef73f2545aafbc0f68e69dcd720/633da86798d0d54f60fb18e5dbc70e91ef5a754c %}

To create the images from letters we will use Jimp. After loading a jimp font we will start constructing the training data. 
For every letter in the alphabet we will create an image version of the uppercase letter. "String.fromCharCode" takes in a ascii code and returns the character. 
In ascii, 65 is the character code for "A". 66 is the character code for "B". etc. If you are using Node.js you can write the image (using image.write) to your file system.
The training data will be in the format "`{ input: number[26], output: number[256] }`". Now use the raw pixel data from image.bitmap.data as output and the catagorical letter index as input. To calculate the greyscale value lets take the sum of the rgb channels and divide by 765. Lets's console.log to check our training data.

{% gist ba2beef73f2545aafbc0f68e69dcd720/3a6a3b7df98a6a36728b4dff137628b32f3abbf4 %}

With the training data in place we can create our neural network by instantiating a new instance of Architect.Perceptron. Pass in the number of nodes per layer to the constructor. In this case we will use 26 nodes in our hidden layer. To train the network you can use the built-in synaptic.Trainer. It's important to set the learning rate to something below 0.05 for this example as a higher learning rate will make the neural network forget it's previous results. To improve the results you could use [LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs). 
Check out a visualization of the network in the image below:

{% include assets/teaching-a-neural-net-how-to-code-visualization.svg %}

<span style="color:green">Green</span> lines mean high weight values and <span style="color:red">red</span> lines low weight values.
<span style="color:green">Green</span> nodes mean a high bias values and <span style="color:red">red</span> nodes a low bias values.

{% gist 26afb76d0bee8ec00dff89946901ed0e/3c7cc74eac7e4d4a87707cba15ee5f687db7088b %}

If you are running this example in the browser you can add a loading message.

{% gist ba2beef73f2545aafbc0f68e69dcd720/6f6373d145aad7677ee1964807f874e0f87e851d %}

Remove the loading message when the neural network is done training.

{% gist ba2beef73f2545aafbc0f68e69dcd720/04d9c77ad951f05157b542749485ad24d284351d %}

Finnaly we add a "keypress" event listener to the document. To listen for valid letters. Every time the user presses a valid key we append the neural network's interpetation of that letter to the document. This can done using Jimp's image.getBase64 method. If you are using Node.js you could create your own implementation.

{% comment %}
SCRIPTS:
{% endcomment %}

<div id="nn-example-text-writer"></div>
# Start Writing:
<div id="nn-network-msg" class="alert alert-warning">Loading neural network...</div>
<canvas height="16" id="c"></canvas>
<input placeholder="Write some Text" name="input-text" id="input-text" type="text" pattern="[A-Za-z ]*">
<button id="write-some-text-go-btn" class="btn btn-default">Go</button>

# Retrain:
**Learning iterations:**
<div class="alert alert-warning">Retraining with a <b>high</b> amount of learning iterations may take up to a minute to complete</div>
<p>
    <input step="1" min="1" max="300" value="50" type="range" class="flat-range-slider" name="learning-iterations" id="learning-iterations-slider">
    <output id="iterations-output">50 iterations</output>
    <button id="retrain-nn-btn" class="btn btn-default">Retrain</button>
</p>

<script src="{{ "/js/lib/jimp.min.js" | absolute_url }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/synaptic/1.1.4/synaptic.min.js" integrity="sha256-t3MKDO0e1ULGddDg4QswIm9r1ZfOzguJLRk2TFuRsIg=" crossorigin="anonymous"></script>
<script src="{{ "/js/lib/neural-net-image-writer.min.js" | absolute_url }}"></script>
<script>
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var f = function(x) { return Math.floor(Math.max(0, Math.min(255, x))) }
    
    window.addEventListener('load', function(e) {
        $.getJSON("{{ "/resources/pretrained-nn.json" | absolute_url }}", function(nn) {
            $('#learning-iterations-slider').on('input', function(e) { 
                iterations = +e.target.value; 
                $('#iterations-output').text(iterations + ' iterations');
            });
            $('#retrain-nn-btn').on('click', function(e) {
                $('#nn-network-msg').removeClass('alert-success').addClass('alert-warning').text('Retraining neural network...').show();
                ImageWriterNeuralNet.train(iterations)
                    .then(function() {
                        $('#nn-network-msg').removeClass('alert-warning').addClass('alert-success').text('Done training neural network.').slideUp();
                    });
            });
            iterations = +$('#learning-iterations-slider').val();
            ImageWriterNeuralNet.load(nn);
            $('#write-some-text-go-btn').on('click', writeSentence);
            $('#nn-network-msg').removeClass('alert-warning').addClass('alert-success').text('Done loading neural network.')
                .delay(2000).slideUp();
            function writeSentence(e) {
                txt = $('#input-text').val();
                try {
                    txt = txt.trim().toUpperCase();
                    canvas.width = 16 * txt.length;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0,0, canvas.width, canvas.height);
                    for(var i = 0; i < txt.length; i++) {
                        if (txt[i] === ' ') continue;
                        var pixdata = ImageWriterNeuralNet.writeLetter(txt[i]);
                        var id = ctx.createImageData(16,16);
                        pixdata.bitmap.data.map(f).forEach(function(x, i) { id.data[i] = x });
                        ctx.putImageData( id, i * 16, 0 );   
                    }
                } catch(err) {
                    alert(err + '. Only letters are accepted.');
                }
            }
        });
    }, false );
</script>

