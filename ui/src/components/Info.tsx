import { Alert, Box, Divider } from "@mui/material";
import "../assets/css/page.sass";
import ArtName from "./gameParts/ArtName";
import { nameParts } from "../utils/matchUtil";

const example = "Henri de Toulouse-Lautrec";

const Info = () => {
  const rows = [
    {
      guess: (
        <Alert key="success" severity="success">
          Attempt #1
        </Alert>
      ),
      meaning:
        "The string you have entered matches the artist's name completely and the entire name is revealed.",
      attempt: "Stays the same",
    },
    {
      guess: (
        <Alert key="info" severity="info">
          Attempt #2
        </Alert>
      ),
      meaning:
        "The string you have entered matches the artist's name partially, i.e. some parts of the artist's name are revealed.",
      attempt: "Stays the same",
    },
    {
      guess: (
        <Alert key="error" severity="error">
          Attempt #3
        </Alert>
      ),
      meaning:
        "The string you have entered does not match the artist's name at all, containing no parts of the name.",
      attempt: "Increases by 1",
    },
  ];
  return (
    <div className="page">
      <Box className="info-card">
        <h2>Game</h2>
        <p className="prose">
          Arthistle (pronounced art-his-tle) is a simple, fun art history
          guessing game to figure out an artist from a series of their works. As
          a{" "}
          <a
            href="https://www.nytimes.com/games/wordle/index.html"
            target={"_blank"}
            rel="noreferrer"
          >
            Wordle
          </a>{" "}
          spin-off, this game shows works of art progressively through guesses
          as you try to figure out the complete name of the artist. This game is
          a great way to learn about art history. The works
          and artists in this app are chosen from a list of top 100 artists
          collated by{" "}
          <a href="https://www.wikiart.org/" target={"_blank"} rel="noreferrer">
            WikiArt
          </a>
          .
        </p>
        <h2>How To Play</h2>
        <p className="prose">
          The aim of the game is to decipher the complete name of an artist
          given five of their works. As you progress through each incorrect
          guess, a new work is revealed. Works that have already been unlocked
          can be revisited at any time with the markers below the image, or with
          the left and right arrow keys. There is also an indicative marker of
          the number of characters and special characters (if any) in the
          artist's name. <br />
          For example, Henri de Toulouse-Lautrec would be reflected as{" "}
          <ArtName
            variant="inline"
            name={example}
            names={nameParts(example)}
          />
          . As guesses are made, parts of the artist's name identified are
          revealed from the masked text. All guesses are validated case
          insensitive. The words entered are each individually matched with each
          of the parts of the artist's name, ignoring accents and punctuation
          and allowing for the odd typo in longer words. Guesses are also
          displayed in a list of attempts with different markers indicating the
          levels of success with each guess as below:
        </p>
        {/* A three column table made the meaning unreadable on a phone, so
            the guide reflows into a stack instead of scrolling sideways. */}
        <dl className="guide">
          {rows.map((row, index) => (
            <div className="guide-row" key={index}>
              <dt className="guide-marker">{row.guess}</dt>
              <dd className="guide-detail">
                <span>{row.meaning}</span>
                <span className="guide-attempt">
                  Attempt number: {row.attempt.toLowerCase()}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Box>
      <Divider className="info-divider" />
      <Box className="info-card">
        <h2>About</h2>
        <p className="prose">
          Arthistle is a pet project using the MERN (Mongo, Express, React,
          Node) stack built on Typescript and deployed on Netlify. Created by an
          enthusiastic computer science student and a keen data scientist, this
          project is a way to combine my passion of art history and computer
          science skills as I learn the ways around building web applications.
          If you're keen on connecting with me, feel free to drop me an{" "}
          <a href="mailto:e0925482@u.nus.edu">email</a>. I'm always looking to
          learn more and working on projects that I can contribute to. Some of
          my other projects can be found on my{" "}
          <a href="https://github.com/astronights/">Github.</a>
        </p>
      </Box>
    </div>
  );
};
export default Info;
