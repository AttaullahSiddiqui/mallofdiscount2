import { Injectable } from '@angular/core';
import { finalize, skip } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient) { }
  fetchAPI(url) {
    return this._http.get(url)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  postAPI(url, reqData) {
    return this._http.post(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  putAPI(url, reqData) {
    return this._http.post(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  deleteAPI(url, reqData) {
    return this._http.delete(url, reqData)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIWithLimit(url, limit, id, skip?) {
    const params = {
      skipNo: skip,
      limitNo: limit,
      quer: id
    }
    return this._http.get(url, { params: params })
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchOnlyLimit(url, limit) {
    return this._http.get(url, { params: { limitNo: limit } })
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchWithQuery(url, id) {
    return this._http.get(url, { params: { _id: id } })
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIUsingId(url, id) {
    return this._http.get(url, { params: { _id: id } })
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  sortAPI(url, updatedArray) {
    return this._http.post(url, updatedArray)
      .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  // storeImage(filePath, selectedImage, cb) {
  //   const fileRef = this.storage.ref(filePath);
  //   return this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         cb(undefined, url);
  //       }, (err) => { cb(err); })
  //     })
  //   );
  // }
  // addUser() {
  //   var userData = {
  //     userName: "danish",
  //     userPass: "jackking9",
  //     admin: true
  //   }
  //   return this._http.post("/api/register", userData)
  //     .pipe(map(res => console.log(res)));
  // }
}
