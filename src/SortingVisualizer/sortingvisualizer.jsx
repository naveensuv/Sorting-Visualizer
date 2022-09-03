import React from 'react';
import {getMergeSortAnimations} from './mergsort.js';
import './sortingvisualizer.css';

const ANIMATION_SPEED_MS = 75;

const NUMBER_OF_ARRAY_BARS = 50;
const PRIMARY_COLOR ='aqua';
document.body.style = 'background: ;';

const SECONDARY_COLOR = 'red';
const thirdcolor='green';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      array: [],
    };
  }

  
  handleChange(evt) {
    
    const { generateArray } = this.props;

    generateArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
  }
    
  
  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({array});
  }



//-----------------------------------------------------------merge sort------------------------------------------------------------

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
     
   
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.backgroundColor = '#004747';
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor=color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

 



//-----------------------------------------------------------selection sort------------------------------------------------------------



  async selectionSort()
  {
    var delay=15;

    const {array}=this.state;
    var resultarray=[];
    var arrayBars = document.getElementsByClassName('array-bar');


    var index=0;
   
    for(var i=0;i<NUMBER_OF_ARRAY_BARS-1;i++)
    {
      const barone=arrayBars[i].style;
      barone.backgroundColor="aqua";

      var min=i;
      //i bar

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
      for(var j=i+1;j<NUMBER_OF_ARRAY_BARS;j++)
      {
        
        const bartwo=arrayBars[j].style;
        bartwo.backgroundColor="#004747";
      }
      for(var j=i+1;j<NUMBER_OF_ARRAY_BARS;j++)
      {
        const bartwo=arrayBars[j].style;

        await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 5)
        );

        bartwo.backgroundColor="skyblue";

        await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 10)
        );

        bartwo.backgroundColor="#004747";
        await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 5)
        );
        if(array[min]>=array[j])
        {
         min=j;
        }

      }

      const stylei=arrayBars[i].style;
      const stylemin=arrayBars[min].style;
      
      stylei.backgroundColor="red";
      stylemin.backgroundColor="red";
     
       
      await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 300)
    );

      var tempi=stylei.height;
      stylei.height=stylemin.height;
      stylemin.height=tempi;
     
      await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 300)
    );

      var temp=array[i];
      array[i]=array[min];
      array[min]=temp;

     
      
      await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 150)
    );
    stylei.backgroundColor="green";
    stylemin.backgroundColor="#004747";
    }

    for(var i=0;i<array.length;i++)
    {
        const style3=arrayBars[i].style;
        await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 50)
        );
        style3.backgroundColor="aqua";
    }
    
  }
   
   swap(el1, el2) {
            return new Promise((resolve) => {
          
                // For exchanging styles of two blocks
                var temp = el1.transform;
                el1.transform = el2.transform;
                el2.transform = temp;
                
                var temp = el1.height;
                el1.height = el2.height;
                el2.height = temp;
                

                window.requestAnimationFrame(function() {
          
                    // For waiting for .25 sec
                    setTimeout(() => {
                        resolve();
                    }, 30);
                });
            });
        }
          




      
   //-----------------------------------------------------------bubble sort------------------------------------------------------------     
      async bubbleSort(delay = 200) {
            const {array}=this.state;
            var blocks =document.getElementsByClassName('array-bar');
          
            // BubbleSort Algorithm
            for (var i = 0; i < array.length; i++) {
               delay=delay-10;
                var blockj2=blocks[array.length - i - 1].style;
                for (var j = 0; j < array.length - i - 1; j++) 
                {
                    delay=delay-1;
                    var blockj=blocks[j].style;
                    var blockj1=blocks[j+1].style;
                  
                    // To change background-color of the
                    // blocks to be compared
                    blockj.backgroundColor = "yellow";
                    blockj1.backgroundColor = "yellow";
          
                    // To wait for .1 sec
                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, delay)
                    );
          
                    console.log("run");
                    var value1 = array[j];
                    var value2 = array[j + 1];
                    var temp=array[j];
          
                    // To compare value of two blocks
                    if (value1 > value2) {
                        await this.swap(blockj,blockj1);
                        array[j]=array[j+1];
                        array[j+1]=temp;
                    }
          
                    // Changing the color to the previous one
                    blockj.backgroundColor = "aqua";
                    blockj1.backgroundColor = "aqua";
                }
          
                //changing the color of greatest element 
                //found in the above traversal
                blockj2.backgroundColor = "#13CE66";
            }
        }
          
//-----------------------------------------------------------quick sort------------------------------------------------------------
  
 async quickSort(l, r,delay=100) {
  const {array}=this.state;
      for(var i=0;i<=19;i++)
      {
      console.log(i+" "+array[i]);   
      }  
  
  if (l < r) {
      // Storing the index of pivot element after partition
      var pivot_idx = await this.lometo_partition(l, r);
     //  console.log("pivot position-->"+pivot_idx);  
      // Recursively calling quicksort for left partition
      await this.quickSort(l, pivot_idx - 1);
      // Recursively calling quicksort for right partition
      await this.quickSort(pivot_idx + 1, r);
    }
  
      
    
   }
  
  
  
 async lometo_partition( l, r, delay = 100) {

   //console.log("r-->"+r+"l--->"+l);
    const {array}=this.state;
   //var resultarray=[];
    var arrayBars = document.getElementsByClassName('array-bar');
    //var resultbars = document.getElementsByClassName('array-bar');
    const barone=arrayBars[l].style;
      const bartwo=arrayBars[r].style;

    // Storing the value of pivot element
    var pivot = array[r];
    var i = l - 1;
   bartwo.backgroundColor = "red";
  
    
    for (var j = l; j <= r; j++) {
      // To change background-color of the
      // blocks to be compared
      const thisbar = arrayBars[j].style;
      thisbar.backgroundColor = "yellow";
      // To wait for 700 milliseconds
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );
  
     // setTimeout(() => {
      //},delay);
  
      var value =array[j];
    
      const bark=arrayBars[j].style;
      
      // To compare value of two blocks
      if (value < pivot) {
        i++;
        const bari=arrayBars[i].style;
        const barj=arrayBars[j].style;
        var temp1 = bari.height;
        var temp2 =array[i];
        bari.height =barj.height;
        barj.height = temp1;

        array[i]=array[j];
        array[j]=temp2;

        bari.backgroundColor = "orange";
        if (i != j) barj.backgroundColor = "pink";
        //To wait for 700 milliseconds
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, delay)
        );
        //setTimeout(() => {
        //}, delay);
      } else  bark.backgroundColor = "pink";
    }
    // Swapping the ith with pivot element
    i++;
    const barii=arrayBars[i].style;
    const barr=arrayBars[r].style;

    var temp1 =  barii.height;
    var temp22 =  array[i];
    barii.height = barr.height;
    barr.height = temp1;

    array[i]=array[r];
    array[r]=temp22;
   
    barr.backgroundColor = "pink";
    barii.backgroundColor = "#13CE66";
    
    // To wait for 2100 milliseconds
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, delay * 3)
    );
  
    //setTimeout(() => {
    //}, delay*3);
  
    for (var k = 0; k < 50; k++) {
      const barkk=arrayBars[k].style;
      barkk.backgroundColor = "aqua";
    }
   
    return i;
  }
  
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }




























  

  render() {
    const {array} = this.state;

    return (
      
      <div className="array-container" style={{display: 'flex', background:'#fff', justifyContent:'center', alignItems:'center', height: '100vh',marginLeft:'-5vh'}}>
       
       <div id="toolbar1">
       <div
          id="generateArray"
          onClick={ () => this.resetArray()}>
         Generate new Array
        </div>
       
       
        <div className="separator1"></div>
        <div
          className="algorithmButton"
          onClick={() => this.mergeSort()}>
          Merge Sort
        </div>
        <div
          className="algorithmButton"
          onClick={() => this.quickSort(0,NUMBER_OF_ARRAY_BARS-1)}>
          Quick Sort
        </div>
        <div
          className="algorithmButton"
          onClick={() => this.selectionSort()}>
          Selection Sort
        </div>
        <div
          className="algorithmButton"
          onClick={() => this.bubbleSort()}>
          Bubble Sort
        </div>
        <div className="separator1"></div>
        <div
          id="arraySize"
         >
          Change Array Size & Sorting Speed
        </div>
        
        <input
          id="changeSize"
          type="range"
          min="0"
          max="100"
          />
          <div className="separator1"></div>
      </div>
       
       
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: 'black',

              height: `${value}px`,
            }}>
              <div  style={{color:'white',height:'50px'}}>
              </div></div>
        ))}
      
      
       </div>
    );
  }
}

















function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) 
     return false;
  for (let i = 0; i < arrayOne.length; i++) 
  {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

