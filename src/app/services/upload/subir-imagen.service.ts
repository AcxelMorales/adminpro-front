import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {

  constructor() { }

  uploadFile(file: File, table: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('img', file, file.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICE + '/upload/' + table + "/" + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }

}
