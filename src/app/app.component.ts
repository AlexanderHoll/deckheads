import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
//import { resolve } from 'node:path';
import { MixcloudapiService } from './mixcloudapi.service';
import { Posts } from './posts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'deckheads';
  // Variable declarations
  // fetch posts as array
  // allPosts:Posts;
  allPosts: any;
  paging: any;

  // player / widget container variables
  player: any;
  widgetCont: any;

  // array for storing tags / genres of mixes
  public allTags: Array<any>= [];

  public streamKey: string;

  // URL string to be passed to widget
  widgetUrl: string = "";

  //streamKey: string = Posts.key;
  elementID: any;

  // declare array to store audio stream keys
  public mixArr: Array<any>= [];

  // create instance of service fetching from API
  constructor(private MixcloudapiService:MixcloudapiService) {}

  // on start-up call api and get all posts
  ngOnInit() {
    
    // establish mixcloud api service, getAllPosts (make call), subscribe to save data
    // data = JSON data fetched
    // declare data as "any" to allow nested object to be passed w/o error
    this.MixcloudapiService.getAllPosts().subscribe((data: any)=>{
      // return data (complete object)
      
      // fetch paging info - url to be passed to next call
      this.paging = data.paging.next;
      
      // data.data (object parsed to pass the cloudcasts fetched)
      this.allPosts = data.data;
      JSON.stringify(this.allPosts);
      

      // send results to be processed
      this.processResults();
    });

  }

  // process JSON from API call
  processResults() {

    // for each object fetch the audio stream key
    this.allPosts.forEach(obj => {

      // push tags to array - array, holding array holding object with tags information
      this.allTags.push(obj.tags);

      // push each value from the list individually to established mixArray variable
      this.mixArr.push(obj.key);
    });

    // handle tags array
    // create array using the contents of the arrays within the tags list - create array of object
    var merged = [].concat.apply([], this.allTags);

    // replace allTags with new merged list
    this.allTags = merged;
  }

  // "play" button
  toggleWidget(event) {
    // establish player as mixcloud player iframe and establish player container
    this.player = document.getElementById('mixcloudPlayer');
    this.widgetCont = document.getElementById('player');

    // hide player
    this.player.style.display = 'none';

    // removes the player
    this.player.remove();

    // retrieve the ID of the clicked button
    this.elementID = event.target.id;

    // widget URL is null, ready for new URL to be stored in
    this.widgetUrl = "";

    // pass elementID as index of array. assign the result to stream key
    this.streamKey = (this.mixArr[this.elementID]);

    // establish widgetURL as default embed url + unique URL fetched from api call
    this.widgetUrl = "https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&hide_artwork=1&feed=" + this.streamKey;

    // add the iframe back into the DOM, within the container, with the newly assigned widget URL
    this.widgetCont.insertAdjacentHTML('afterbegin', '<iframe id="mixcloudPlayer" width="100%" height="60" frameborder="0" src="' + this.widgetUrl + '"></iframe>');

    // show player
    this.player.style.display = 'block';
  }

}
