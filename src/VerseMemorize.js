import React, { Component } from 'react';
import data from "./bibles/ru";
import objectHash from "object-hash";
const book = 0;
const chapter = 0;
const verse = 0;
const oneVerse = data.books[book].chapters[chapter].verses[verse].text;
const verseName = data.books[0].chapters[0].verses[0].name;
const wholeVerse = oneVerse + verseName;


console.log(wholeVerse);

function compareHashes(hash1,hash2) {
    //console.log(hash1);
    //console.log(hash2);
        if (hash1===hash2)
        return true
        else
        return false


}


function ActiveWords (props) {
      return (
        <div>
          <h3>Правильний вірш з Біблії</h3>
          <ul>
            {props.list.map((bible_words) => (
              <li key={bible_words.index}>
                <span>{bible_words.chunk_of_words}</span>
                <button id="remove_button" onClick={() =>
                props.onRemoveWord(bible_words.index)}>Видалити</button>
                <button id="deactivate_button" onClick={() =>
                props.onToggleWord(bible_words.index,bible_words.chunk_of_words)}>Деактивувати</button>
              </li>
            ))}
          </ul>
        </div>
      )
} //end ActiveWords


function InactiveWords (props) {
      return (
        <div>
          <h3>Неправильний вірш</h3>
          <ul>
            {props.list.map((bible_words) => (
              <li key={bible_words.index}>

                <span>{bible_words.chunk_of_words}</span>

                <button id="activate_button" onClick={() =>
                props.onToggleWord(bible_words.index,bible_words.chunk_of_words)}>Активувати</button>
              </li>
            ))}
          </ul>
        </div>
      )
}//end InactiveWords



class VerseMemorize extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verse: wholeVerse,
            bible_words: [],
            text_hash: objectHash.sha1(wholeVerse),
            main_hash: objectHash.sha1(''),
        }
        //binds here
        this.updateInput_text = this.updateInput_text.bind(this)
        this.updateInput_main = this.updateInput_main.bind(this)
        this.handleAddAllWords = this.handleAddAllWords.bind(this);
        this.handleToggleWord_to_active = this.handleToggleWord_to_active.bind(this)
        this.handleToggleWord_from_active = this.handleToggleWord_from_active.bind(this)
        this.handleRemoveWord = this.handleRemoveWord.bind(this)

    }//end constructor

    // all handlers here

  async handleAddAllWords() {
        let i=0;
        let BW_array = [];
        let array2 = [];
        BW_array = await this.state.verse.match(/.*?[\.\)\s]+?/g);
        //console.log(BW_array);
        while(BW_array.length !== 0) {
            let randomIndex=Math.floor(Math.random() * BW_array.length);
            array2.push(BW_array[randomIndex]);
            BW_array.splice(randomIndex,1);
        }
        BW_array = array2;
        console.log(BW_array);

       // console.log(BW_array);

        do {

        this.setState((currentState) => {

          return {
            bible_words: currentState.bible_words.concat([{
            chunk_of_words: BW_array[i],
            index: i,
            active: false,
            text_hash: objectHash.sha1(this.state.verse),
            main_hash: objectHash.sha1(''),
           }])
          }

        })
        i++;
       }
       while (i < BW_array.length);
  } //end handleAddAllWords


      handleRemoveWord(index) {
        this.setState((currentState) => {
          return {
            bible_words: currentState.bible_words.filter((bible_words) => bible_words.index !== index)
          }
        })
      }


      handleToggleWord_to_active(index,chunk_of_words) {
        this.setState((currentState) => {
          const bible_words = currentState.bible_words.find((bible_word) => bible_word.index === index)

          this.state.value_main=this.state.value_main +chunk_of_words;
          this.state.main_hash= objectHash.sha1(this.state.value_main);
          if (compareHashes(this.state.text_hash,this.state.main_hash)) {
            alert('you made it!');
          }

          return {
            bible_words: currentState.bible_words.filter((bible_word) => bible_word.index !== index)
              .concat([{
                index,
                chunk_of_words,
                active: !bible_words.active
              }])
          }
        })
      }

      handleToggleWord_from_active(index,chunk_of_words) {
        this.setState((currentState) => {
          const bible_words = currentState.bible_words.find((bible_word) => bible_word.index === index)

          //this.state.value_main=this.state.value_main +chunk_of_words;
          this.state.main_hash= objectHash.sha1(this.state.value_main);
          if (compareHashes(this.state.text_hash,this.state.main_hash)) {
            alert('you made it!');
          }

          return {
            bible_words: currentState.bible_words.filter((bible_word) => bible_word.index !== index)
              .concat([{
                index,
                chunk_of_words,
                active: !bible_words.active
              }])
          }
        })
      }

      updateInput_text(e) {
      //console.log(e.target.value)
      const value = e.target.value
        this.setState({
          value: value,
          text_hash: objectHash.sha1(value),
        })
     }

     updateInput_main(e) {
      const value_main = e.target.value
        this.setState({
          value_main: value_main,
          main_hash: objectHash.sha1(value_main),
        })
     }

    render() {
     return (

    <div>

            <div id="bible_text">
            <h3>Цитата з Біблії:</h3>{this.state.text_hash}

            <br />
              <textarea rows="3" cols="100" id="bible_text" value={this.state.verse}
                                            onChange={this.updateInput_text} />

            <br />
                <button onClick={this.handleAddAllWords}>
                        Поділити вірш на окремі слова
                </button>
            <br />
            </div>

            <div id="main_text">
                     {this.state.main_hash}
                <br />
                    <textarea rows="3" cols="100" value  ={this.state.value_main}
                                            onChange={this.updateInput_main}/>
            </div>

            <div id="clear_button">
              <button id="clear_button" onClick={() => this.setState({
                bible_words: [],
                value_main: '',
                main_hash: objectHash.sha1(''),


              })}>Все очистити</button>
            </div>


            <div id ="active">
            <  ActiveWords
                list={this.state.bible_words.filter((bible_words) => bible_words.active === true)}
                onRemoveWord={this.handleRemoveWord}
                onToggleWord={this.handleToggleWord_from_active}

            />
            </div>
            <div id="inactive">
              <InactiveWords
                list={this.state.bible_words.filter((bible_words) => bible_words.active === false)}
                onToggleWord={this.handleToggleWord_to_active}

            />
            </div>

          </div>


        );
    }

}

export default VerseMemorize;
