# PAO Matrix Trainer

<a href="https://www.youtube.com/watch?v=OApSOU7NIAw" target="_blank"><img src="src/main/resources/static/img/home/paocards-front-page.png" alt="Click to view YouTube of Memory Championship"></a><sup>
Click image to view YouTube of this Memory Championship.</sup>

This memory technique is used by participants in the World Memory Championships, where you quickly browse through a
randomly shuffled deck of cards, memorize and recall the cards in chronological order.

This web app helps train this memory technique and will expand your capacity to memorize a full deck of cards,
chronologically.

## Why?

You might think, "Why would I want to spend my precious time on trying to memorize a random deck of playing cards,
chronologically?"

Because memorizing playing cards...

- is the best memory exercise ever.
- will improve your overall memory functions.
- makes you good at memorizing long lists, via memory palaces.
- develops killer abilities with memorizing and managing abstractions.
- improves your imagination.
- makes you more mentally agile.
- helps with language learning.
- improves your critical thinking.
- is a cool party stunt and a legitimate sport.
- is a transferable skill.
- will give you untold waves of accomplishment and self-esteem.
- makes you excel at card games like bridge, poker and blackjack.

But most importantly, mastering this memory skill, makes you the champion of your own mind, because you managed to force
your brain to learn something new and complex, which will benefit you in the future.

I would guess that you can master this technique, in about a few weeks, if you put some effort into it. Trust yourself,
you can do it and you'll get a major kick and self-esteem out of it.

## Components

It consists of the following main components:

- PAO Matrix.
- Quiz.
- Memory Palace.

## PAO Matrix

<p>If you're "normal", you can master this skill in a few weeks, but you have to be disciplined, persistent and focus on memorizing the PAO Matrix.</p>
<a href="src/main/resources/static/img/home/matrix.jpg" target="_blank"><img style="width:100%" src="src/main/resources/static/img/home/matrix.jpg" alt="PAO Matrix"></a><sup>Click image to enlarge.</sup>

## Quiz

<p>The Quiz interface helps you train your PAO Matrix memory speed and correctness, by prompting you to recall the Person, Action & Object values for a given card.</p>
<img style="width:100%" src="src/main/resources/static/img/home/quiz.png" alt="Quiz">
<p>The random card represents a visual image of the person behind the card. This should help you recall the PAO values.</p>
<p>So the correct answers, in this case, are</p>

- Person = Victoria Beckham
- Action = Applies makeup in front of
- Object = Mirror
- Card = Queen of Clubs.

## Memory Palace

<p>The Memory Palace interface helps you train and navigate your memory palace, which holds 52 cards, in 17 locations, each holding the next 3 cards, with one last card left.</p>
<img style="width:100%" src="src/main/resources/static/img/home/memory-palace.png" alt="Memory Palace">

Each memory palace location (loci) defines a weird memorable sentence, from its three cards, that you should visualize
in your mind.

The location sentence is created by combining the different PAO values from its three cards:<br>

- Card 1: Person value = Steve Jobs<br>
- Card 2: Action value = star-jumps on<br>
- Card 3: Object value = suicide bomber<br>

Giving the sentence: "Steve Jobs star-jumps on suicide bomber".

### Reversing the thought process

Imagine you're done going through all the cards and recall the first location sentence like the one above:

<div style="font-size: 20pt">
<span style="color:#5A5A5A;">Steve Jobs</span> <span style="color:#FFC107">star-jumps on</span> <span style="color:#0052CC">suicide bomber</span>
</div>

#### First card (Steve Jobs):

- You recall the powerful and charismatic entrepreneur.
- A powerful person = matrix columns (9, 10).
- A male = odd number = 9.
- In the lovable group / suit = Hearts.
- Card = 9 of Hearts.

#### Second card (star-jumps on):

- You recall celebrity Michelle Obama is the one doing star-jumps.
- A celebrity = matrix columns (12, 13).
- A female = even number = 12 (Queen).
- In the lovable category / suit = Hearts.
- Card = Queen of Hearts.

#### Third card (suicide bomber):

- You recall the controversial Bin Laden recording a video of a suicide bomber.
- A controversial = matrix columns (5, 6).
- A male = odd number = 5.
- In the crazy category / suit = Clubs.
- Card = 5 of Clubs.

<p>So the result = (9 of Hearts), (Queen of Hearts) and (5 of Clubs).</p>

<table style="border:none">
<tr>
<td style="border:0"><img style="display:inline" width="100" src="src/main/resources/static/svg/cards/9_of_hearts.svg" alt="9 of Hearts"></td>
<td><img style="display:inline" width="100" src="src/main/resources/static/svg/cards/queen_of_hearts.svg" alt="Queen of Hearts"></td>
<td><img style="display:inline" width="100" src="src/main/resources/static/svg/cards/5_of_clubs.svg" alt="5 of Clubs"></td>
</tr>
</table>

## More Information

To get more in-depth understanding of how this memory technique works, check this
out: [Introduction to the PAO Matrix technique](https://learningisliving.dk/2018/03/25/remember-carddeck/).

## Technologies

This web app is build with

- Backend: Spring Boot, Java, serving JSON data...
- Frontend: JavaScript, HTML, CSS, Bootstrap, JSON...

## License

Free code use under the open-source software MIT license. Enjoy.

## Contact Info

Website: https://learningisliving.dk

LinkedIn: https://www.linkedin.com/in/kahalani/
