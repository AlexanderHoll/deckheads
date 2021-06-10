import { Injectable } from '@angular/core';
// call angular default http client
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// impost posts.ts to save fetched information
import { Posts } from '../app/posts';

@Injectable({
  providedIn: 'root'
})
export class MixcloudapiService {

  // inject http client via constructor
  constructor(private httpClient:HttpClient) { }

  // user defined function - get all mixcloud entries for Deckheads
  // fetch posts.ts for saving of info
  getAllPosts():Observable<Posts[]> {

    // pass search query for "deckheadsfm" profile name and filter for cloudcasts
    // const url='https://api.mixcloud.com/search/?q=deckheadsfm&type=cloudcast';

    // default api link for profile resulted in a CORs issue. Added a "/" at the end per Mixcloud developer's instructions. Now works
    const url='https://api.mixcloud.com/deckheadsfm/cloudcasts/';

    // initialise httpclient, GET request using the passed URl
    return this.httpClient.get<Posts[]>(url);
  }
}
