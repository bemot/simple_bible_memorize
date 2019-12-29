import React, { Component } from 'react';
import data from "./bibles/og.json";
import objectHash from "object-hash";
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

const book = 0;
const chapter = 0;
const verse = 0;
const oneVerse = data.books[book].chapters[chapter].verses[verse].text;
const verseName = data.books[0].chapters[0].verses[0].name;
const wholeVerse = oneVerse + '('+verseName+')';
//console.log(wholeVerse);

function compareHashes(hash1,hash2) {
    //console.log(hash1);
    //console.log(hash2);
        if (hash1===hash2)
        return true
        else
        return false
}

//////////////////////////////////////////////////////////////////////////////////////
function ActiveBook(props) {

    var knygy = []

    // var book_id = 0
    //var book_name =''
    //console.log(props.bible);
    for (var i=0; i< props.bible.books.length;i++) {
        knygy.push(
            {book_id: i,
             book_name: props.bible.books[i].name
            }
        )
    }

    // console.log(chaps)
    return(
        <div>
            <DropdownList
                data = {knygy}
                valueField='book_id'
                textField= 'book_name'
                defaultValue={knygy[0].book_name}
                onChange= {props.onChange}


            />

        </div>

    )
}

//////////////////////////////////////////////////////////////////////////////////
//
function ActiveChapter(props) {

    var rosdily = []

    console.log(props.bible);
    console.log(props.book_num)
    for (var i=0; i< props.bible.books[props.book_num].chapters.length;i++) {
        rosdily.push(
            {chapter_id: i,
             chapter_name: props.bible.books[props.book_num].chapters[i].name
            }
        )
    }

    // console.log(chaps)
    return(
        <div>
            <DropdownList
                data = {rosdily}
                valueField='chapter_id'
                textField= 'chapter_name'
                defaultValue={rosdily[0].chapter_name}
                onChange= {props.onChange}


            />

        </div>

    )
}

///////////////////////////////////////////////////////////////////////////////////
//
function ActiveVerse(props) {

    var virshi = []

    console.log(props.bible);
    console.log(props.verse_num)
    for (var i=0; i< props.bible.books[props.book_num].chapters[props.chap_num].verses.length;i++) {
        virshi.push(
            {verse_id: i,
             verse_name: props.bible.books[props.book_num].chapters[props.chap_num].verses[i].name
            }
        )
    }

    // console.log(chaps)
    return(
        <div>
            <DropdownList
                data = {virshi}
                valueField='verse_id'
                textField= 'verse_name'
                defaultValue={virshi[0].verse_name}
                onChange= {props.onChange}


            />

        </div>

    )
}



///////////////////////////////////////////////////////////////////////////////////
//////// NOT USING IT NOW ////////
////////////////////////////////////////////////////
function ActiveBible (props) {
    const bibles = [{bible:'og',bname:'Ukrainian Ogienko'},
                    {bible:'kj',bname:'King James'},
                    {bible:'rs',bname:'Rusian Synodal'}];
     //let alertWhenChanged = () => console.log('from activeBible');
     return (
        <div>
            <DropdownList
                data = {bibles}
                valueField='bname'
                textField= 'bname'
                defaultValue= {bibles[0].bname}
                onChange = {props.onChange}
            />
        </div>
    )
}


//////////////////////////////////////////////////////////////////////////////////
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
            bible: data ,
            bookNumber: 0,
            chapterNumber: 0,
            verseNumber: 0,
            current_bible : {bible:'og',bname:'Ukrainian Ogienko'},
            value_main: '',
            verse: wholeVerse,
            bible_words: [],
            text_hash: objectHash.sha1(wholeVerse),
            main_hash: objectHash.sha1(''),
        }
        //binds here
        //console.log(this.state.current_bible)

        this.updateInput_text = this.updateInput_text.bind(this)
        this.updateInput_main = this.updateInput_main.bind(this)
        this.handleAddAllWords = this.handleAddAllWords.bind(this);
        this.handleToggleWord_to_active = this.handleToggleWord_to_active.bind(this)
        this.handleToggleWord_from_active = this.handleToggleWord_from_active.bind(this)
        this.handleRemoveWord = this.handleRemoveWord.bind(this)
        this.handleChangeBCW = this.handleChangeBCW.bind(this)
     }//end constructor

// all handlers heron_encode($data)ta(){
/////////////////////////////////////////////////////////////////////////////////////
  async handleChangeBCW(bk,ch,vr) {
    await this.setState((currentState) => {
      return {

              bookNumber: bk,
              chapterNumber: ch,
              verseNumber: vr,
              verse: data.books[bk].chapters[ch].verses[vr].text,
          }
     })
   }

/////////////////////////////////////////////////////////////////////////////////////
    async handleAddAllWords() {
        let i=0;
        let BW_array = [];
        let array2 = [];
        BW_array = await this.state.verse.match(/.*?[.)\s]+?/g);
        //console.log(BW_array);
        while(BW_array.length !== 0) {
            let randomIndex=Math.floor(Math.random() * BW_array.length);
            array2.push(BW_array[randomIndex]);
            BW_array.splice(randomIndex,1);
        }
        BW_array = array2;
      //console.log(BW_array);

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


//////////////////////////////////////////////////////////////////////////////////////
      handleRemoveWord(index) {
        this.setState((currentState) => {
          return {
            bible_words: currentState.bible_words.filter((bible_words) => bible_words.index !== index)
          }
        })
      }


//////////////////////////////////////////////////////////////////////////////////////
    handleToggleWord_to_active(index,chunk_of_words) {
        this.setState((currentState) => {
          const bible_words = currentState.bible_words.find((bible_word) => bible_word.index === index);
          const hash_string = objectHash.sha1(this.state.value_main + chunk_of_words);
        if (compareHashes(hash_string,this.state.text_hash)) {
            alert('You are genius!!!')
        }
          return {
            value_main: this.state.value_main + chunk_of_words,
            main_hash:  hash_string,
            bible_words: currentState.bible_words.filter((bible_word) => bible_word.index !== index)
              .concat([{
                index,
                chunk_of_words,
                active: !bible_words.active
              }])
          }
        })
      }


////////////////////////////////////////////////////////////////////////////////////////
    handleToggleWord_from_active(index,chunk_of_words) {
        this.setState((currentState) => {
          const bible_words = currentState.bible_words.find((bible_word) => bible_word.index === index)

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


////////////////////////////////////////////////////////////////////////////////////////
   updateInput_text(e) {
      //console.log(e.target.value)
      const verse = e.target.value
       this.setState({
          verse: verse,
          text_hash: objectHash.sha1(verse),
        })
     }


////////////////////////////////////////////////////////////////////////////////////////
    updateInput_main(e) {
         const value_main = e.target.value
         const new_hash =  objectHash.sha1(this.state.value_main);

       // console.log(value_main)
       // console.log('new_hash', new_hash);
       // console.log('text hash', this.state.text_hash);

       if (compareHashes(new_hash,this.state.text_hash)) {
            alert('You are genius!!!')
         }
        this.setState({
          value_main: value_main,
          main_hash: objectHash.sha1(value_main),
        })

     }
///////////////////////////////////////////////////////////////////////////////////////
    render() {
     return (

      <div>
            <div id="activeBook"><ActiveBook
                    bible={this.state.bible}
                    onChange={(value) => {
                        this.handleChangeBCW(value.book_id,0,0)}
                    }

              /></div>

      <div id="activeChapter">
          <ActiveChapter
              bible={this.state.bible}
              book_num={this.state.bookNumber}
              onChange={(value) => {
                        this.handleChangeBCW(this.state.bookNumber,value.chapter_id,0)}
              }
          />

      </div>

       <div id="activeVerse">
          <ActiveVerse
              bible={this.state.bible}
              book_num={this.state.bookNumber}
              chap_num={this.state.chapterNumber}
              onChange={(value) => {
                        console.log(value)
                        this.handleChangeBCW(this.state.bookNumber,this.state.chapterNumber,value.verse_id)}
              }
          />

      </div>


        <br />


        <h3>Цитата з Біблії:</h3>
           <div id="bible_text">
                {this.state.text_hash}
            <br />
              <textarea rows="3" cols="100" id="bible_text" value={this.state.verse}
                  onChange={this.updateInput_text}

              />

            <br />
                <button onClick={this.handleAddAllWords}>
                        Поділити вірш на окремі слова
                </button>
            <br />
            </div>

            <div id="main_text">
                     {this.state.main_hash}
                <br />
                    <textarea rows="3" cols="100" value ={this.state.value_main}
                        onChange={this.updateInput_main}
                        />
            </div>

            <div id="clear_button">
              <button id="clear_button" onClick={() => this.setState({
                bible_words: [],
                value_main: '',
                main_hash: objectHash.sha1(''),
              })}>Все очистити</button>
            </div>


            <div id ="active">
              <ActiveWords
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

             <div> Book Number = {this.state.bookNumber+1} Chapter Number = {this.state.chapterNumber+1} Verse Number = {this.state.verseNumber+1}</div>


         </div>


        );
    }

}

export default VerseMemorize;
