package com.itnerds.paocards.api.pao.service;

import com.itnerds.paocards.pao.PAOItem;
import com.itnerds.paocards.pao.PAOMatrix;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class PAOService {

    private HashMap<String, PAOMatrix> paoMatrices;

    public PAOService() {

        paoMatrices = new HashMap<>();

        List<PAOItem> hearts = new ArrayList<>();
        hearts.add( new PAOItem("A. Schwartenegger", "Bench press", "Barbell", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h1.jpg"));
        hearts.add( new PAOItem("Flojo", "Breaks nail on", "Gold medal", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h2.jpg"));
        hearts.add( new PAOItem("Tom Hanks", "Runs through", "Forest", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h3.jpg"));
        hearts.add( new PAOItem("Scarlett Johansson", "Drinks with", "Bill Murray", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h4.jpg"));
        hearts.add( new PAOItem("Julian Assange", "Vanishes into", "Puff of smoke", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h5.jpg"));
        hearts.add( new PAOItem("Taylor Swift", "Offended by", "Kanye West", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h6.jpg"));
        hearts.add( new PAOItem("Albert Einstein", "Fly at light speed into", "Shiny star", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h7.jpg"));
        hearts.add( new PAOItem("Pamala Andersen", "Saves drowning", "Child", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h8.jpg"));
        hearts.add( new PAOItem("Steve Jobs", "Use LSD and invent", "iPad", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h9.jpg"));
        hearts.add( new PAOItem("JK Rowling", "Writes story about", "Harry Potter", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h10.jpg"));
        hearts.add( new PAOItem("Jesus Christ", "Walks on", "Puddle", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h11.jpg"));
        hearts.add( new PAOItem("Michelle Obama", "Star-jumps on", "White House lawn", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h12.jpg"));
        hearts.add( new PAOItem("Barack Obama", "Fly-swatting", "Buzzing fly", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-h13.jpg"));

        List<PAOItem> spades = new ArrayList<>();
        spades.add( new PAOItem("Usain Bolt", "Chases", "Cheetah", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s1.jpg"));
        spades.add( new PAOItem("Annika Sorenstam", "Puts", "Golf ball", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s2.jpg"));
        spades.add( new PAOItem("Ben Stiller", "Polygraphed by", "Robert De Niro", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s3.jpg"));
        spades.add( new PAOItem("June Carter", "Plays guitar with", "Johnny Cash", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s4.jpg"));
        spades.add( new PAOItem("Osama Bin Laden", "Records video with", "Suicide bomber", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s5.jpg"));
        spades.add( new PAOItem("Lady Gaga", "Wears meat for", "Paparazzi", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s6.jpg"));
        spades.add( new PAOItem("Stephen Hawking", "Sounds robotic in", "Whellchair", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s7.jpg"));
        spades.add( new PAOItem("Naomi Campbell", "Beats maid with", "Handbag", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s8.jpg"));
        spades.add( new PAOItem("Kevin Rose", "Drinks", "Tea", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s9.jpg"));
        spades.add( new PAOItem("Sarah Palin", "Riffle-shoots", "Moose", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s10.jpg"));
        spades.add( new PAOItem("Dalai Lama", "Prays to", "Buddha", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s11.jpg"));
        spades.add( new PAOItem("Victoria Beckham", "Does makeup in", "Mirror", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s12.jpg"));
        spades.add( new PAOItem("David Beckham", "Kicks", "Football", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-s13.jpg"));

        List<PAOItem> diamonds = new ArrayList<>();
        diamonds.add( new PAOItem("Michael Jordan", "Slam dunks", "Basketball", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d1.jpg"));
        diamonds.add( new PAOItem("Caroline Wozniacki", "Grand slams", "Enrique Iglesias", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d2.jpg"));
        diamonds.add( new PAOItem("George Clooney", "Smokes", "Cigarette", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d3.jpg"));
        diamonds.add( new PAOItem("Julia Roberts", "Tongue kisses", "Richard Gere", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d4.jpg"));
        diamonds.add( new PAOItem("Joseph Stalin", "Tells joke to", "Bear", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d5.jpg"));
        diamonds.add( new PAOItem("Madonna", "Dances with", "Ghettoblaster", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d6.jpg"));
        diamonds.add( new PAOItem("Isaac Newton", "Hit on head by", "Apple", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d7.jpg"));
        diamonds.add( new PAOItem("Marylin Monroe", "Flutter over", "Subway vent", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d8.jpg"));
        diamonds.add( new PAOItem("Bill Gates", "Furiously reboot", "Crashed PC", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d9.jpg"));
        diamonds.add( new PAOItem("Oprah Winfrey", "Interviews", "Couch", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d10.jpg"));
        diamonds.add( new PAOItem("Zeus", "Throws", "Lighting bolt", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d11.jpg"));
        diamonds.add( new PAOItem("Princess Kate", "In white before", "Church", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d12.jpg"));
        diamonds.add( new PAOItem("Prince William", "Save people from", "Sea", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-d13.jpg"));

        List<PAOItem> clubs = new ArrayList<>();
        clubs.add( new PAOItem("Mohammad Ali", "Knocks out", "Butterfly", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c1.jpg"));
        clubs.add( new PAOItem("Serena Williams", "Raises", "Trophy", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c2.jpg"));
        clubs.add( new PAOItem("Jack Sparrow", "Steals back", "Black pearl", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c3.jpg"));
        clubs.add( new PAOItem("Lara Croft", "Karate kicks", "Ancient tomb", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c4.jpg"));
        clubs.add( new PAOItem("Adolf Hitler", "Goose-steps Into", "Bunker", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c5.jpg"));
        clubs.add( new PAOItem("Rihanna", "Uses umbrella for", "Rainstorm", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c6.jpg"));
        clubs.add( new PAOItem("Thomas Edison", "Screws In", "Light bulb", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c7.jpg"));
        clubs.add( new PAOItem("Medusa", "Turns Into", "Stone", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c8.jpg"));
        clubs.add( new PAOItem("Mark Zuckerberg", "Unfriends", "Best friend", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c9.jpg"));
        clubs.add( new PAOItem("Hillary Clinton", "Smacks", "Monica Lewinsky", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c10.jpg"));
        clubs.add( new PAOItem("Pope John-Paul II", "Forgives", "Devil", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c11.jpg"));
        clubs.add( new PAOItem("Beyonce", "Power dances on", "Beach", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c12.jpg"));
        clubs.add( new PAOItem("Jay-Z", "Raps into", "Microphone", "https://learningisliving.dk/wp-content/uploads/2021/11/pao-classic-c13.jpg"));

        PAOMatrix matrix = new PAOMatrix(hearts, spades, diamonds, clubs);

        paoMatrices.put("default", matrix);
    }

    public HashMap<String, PAOMatrix> findAll() {
        return paoMatrices;
    }

    public Optional<PAOMatrix> find(String id) {
        return Optional.of(paoMatrices.get(id));
    }
}
