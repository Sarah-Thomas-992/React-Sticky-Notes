import React, { Component } from "react";
// import { render } from "react-dom";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    const newArray = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: newArray });
  };

  removeNote = (selectedID) => {
    const newArray = this.state.notes.filter((note) => note.id !== selectedID);
    this.setState({ notes: newArray });
  };

  onSearch = (text) => {
    const littleSearch = text.toLowerCase();
    const updatedArray = this.state.notes.map((note) => {
      if (!littleSearch) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(littleSearch);
        const descriptionMatch = description.includes(littleSearch);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({ notes: updatedArray, searchText: littleSearch });
  };

  componentDidUpdate() {
    const savedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotes);
  }

  componentDidMount() {
    const savedNotes = localStorage.getItem("savedNotes");
    if (savedNotes) {
      const updatedNotes = JSON.parse(savedNotes);
      this.setState({ notes: updatedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          addNote={this.addNote}
          searchText={this.state.searchText}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
