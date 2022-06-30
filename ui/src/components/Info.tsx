import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "../assets/css/page.sass";

const Info = () => {
  const box_style = {
    width: "inherit",
    height: "inherit",
    padding: "1em",
    border: `0.1em solid #ccc`,
    borderRadius: "0.5em",
    margin: "2em",
  };

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
    {
      guess: (
        <Alert key="warning" severity="warning">
          Attempt #4
        </Alert>
      ),
      meaning:
        "There has been an error with the matching process. Please try again.",
      attempt: "Increases by 1",
    },
  ];
  return (
    <div className="page">
      <Box sx={box_style}>
        <h2>Game</h2>
        <p className="indent">
          Arthistle (pronounced art-hist-le) is a simple, fun art history
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
          a great way to is a great way to learn about art history. The works
          and artists in this app are chosen from a list of top 100 artists
          collated by{" "}
          <a href="https://www.wikiart.org/" target={"_blank"} rel="noreferrer">
            WikiArt
          </a>
          .
        </p>
        <h2>How To Play</h2>
        <p className="indent">
          The aim of the game is to decipher the complete name of an artist
          given five of their works. As you progress through each incorrect
          guess, a new work is revealed. There is also an indicative marker of
          the number of characters and special characters (if any) in the
          artist's name. <br />
          For example, Henri de Toulouse-Lautrec would be reflected as{" "}
          <span className="mask">Henri</span> <span className="mask">de</span>{" "}
          <span className="mask">Toulouse</span>-
          <span className="mask">Lautrec</span>. As guesses are made, parts of
          the artist's name identified are revealed from the masked text. All
          guesses are validated case insensitive. The words entered are each
          individually matched with each of the parts of the artist's name using
          a fuzzy logic approach. Guesses are also displayed in a list of
          attempts with different markers indicating the levels of success with
          each guess as below:
        </p>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Guess</TableCell>
                <TableCell>Meaning</TableCell>
                <TableCell>Attempt#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.guess}</TableCell>
                  <TableCell>{row.meaning}</TableCell>
                  <TableCell>{row.attempt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={box_style}>
        <h2>About</h2>
        <p className="indent">
          Arthistle is a pet project using the MERN (Mongo, Express, React,
          Node) stack built on Typescript and deployed on Heroku. Created by an
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
