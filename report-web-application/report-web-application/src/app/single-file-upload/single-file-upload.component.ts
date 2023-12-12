import { Component } from "@angular/core";
import { HttpClient,HttpHeaders, } from "@angular/common/http";
import { throwError } from "rxjs";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-single-file-upload",
  templateUrl: "./single-file-upload.component.html",
  styleUrls: ["./single-file-upload.component.css"],
})
export class SingleFileUploadComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

  endpoint: string = 'http://localhost:8080/api/gtfshandler';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', 'http://localhost:8000');
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();
  
      formData.append('file', this.file, this.file.name);
  
      const upload$ = this.http.post(`${this.endpoint}/uploadArchive`, formData);
  
      this.status = 'uploading';
  
      upload$.subscribe({
        next: () => {
          this.status = 'success';
        },
        error: (error: any) => {
          this.status = 'fail';
          return throwError(() => error);
        },
      });
    }
  }
}