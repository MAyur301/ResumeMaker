import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { resume } from './modal/resume.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'resumemaker';
  formdata!: resume;
   editmode = false;
  resumeForm!:FormGroup;
  uname!: string;

  ngOnInit() {
    this.resumeForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),

      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        Area: new FormControl(null, Validators.required),
        postal: new FormControl(null, Validators.required),
      }),

      skills: new FormArray([]),
      eduction: new FormArray([]),
      experience: new FormArray([]),
    });
  }
  onsubmit() {
    this.editmode=true;
    console.log(this.resumeForm.value);
    this.formdata = this.resumeForm.value;
    console.log(this.formdata);

    this.resumeForm.reset();
  }
  // genrateusername() {
  //   let username: string = '';
  //   let Firstname = this.resumeForm.value.firstname;
  //   let Lastname = this.resumeForm.value.lastname;
  //   let Dob = this.resumeForm.value.dob;

  //   if (Firstname.length >= 3) {
  //     username += Firstname.slice(0, 2);
  //   } else {
  //     username += Firstname;
  //   }
  //   if (Lastname.length >= 3) {
  //     username += Lastname.slice(0, 2);
  //   } else {
  //     username += Lastname;
  //   }

  //   username += Dob.slice(0, 4);

  //   this.uname = username;

  //   //console.log(this.uname);
  // }
  data() {
    return (this.resumeForm.get('skills') as FormArray).controls;
  }
  data1() {
    return (this.resumeForm.get('eduction') as FormArray).controls;
  }
  data2() {
    return (this.resumeForm.get('experience') as FormArray).controls;
  }
  Addskills() {
    return (<FormArray>this.resumeForm.get('skills')).push(
      new FormControl(null, Validators.required)
    );
  }
  AddEduction() {
    const formgroup = new FormGroup({
      school: new FormControl(null, Validators.required),
      degree: new FormControl(null, Validators.required),
      percentage: new FormControl(null,[ Validators.required,Validators.max(99)]),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
    });
    return (<FormArray>this.resumeForm.get('eduction')).push(formgroup);
  }
  AddExperience() {
    const formgroup = new FormGroup({
      cName: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      Experience: new FormControl(null, Validators.required),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
    });
    return (<FormArray>this.resumeForm.get('experience')).push(formgroup);
  }
  deleteskill(index: number) {
    (<FormArray>this.resumeForm.get('skills')).removeAt(index);
  }
  deleteEduction(index: number) {
    (<FormArray>this.resumeForm.get('eduction')).removeAt(index);
  }
  delteExperience(index: number) {
    (<FormArray>this.resumeForm.get('experience')).removeAt(index);
  }
  uploaddata() {
    this.resumeForm.setValue({
      firstname: 'Mayur',
      lastname: 'Bhavsar',
      email: 'Bhavsarmayur@786.gmail.com',
      username: 'Hii i am Fullstack Developer',
      dob: '2002-01-03',
      gender: 'male',
      address: {
        street: '103 Shakti VIjay Society',
        country: 'Indian',
        city: 'Ahmebadad',
        Area: 'odhav',
        postal: '382415',
      },
      skills: ['c','c++'],
      eduction: [
        {
          school: 'Arubuda Sanskar vidhlay',
          degree: 'SSC',
          percentage: 78,
          start: '2018-03-12',
          end: '2019-02-01',
        },
        {
          school: 'Arubuda Sanskar vidhlay',
          degree: 'HSC',
          percentage: 78,
          start: '2013-05-06',
          end: '2022-07-09',
        },
      ],
      experience: [
        {
          cName: 'BTL',
          position: 'JuniorDeveloper',
          Experience: 1,
          start: '2022-03-04',
          end: '2023-04-05',
        },
        {
          cName: 'BTL',
          position: 'JuniorDeveloper',
          Experience: 3,
          start: '2024-05-04',
          end: '2025-03-05',
        },
      ],
    });
  }
  convertpdf()
  {
    var data = document.getElementById("userDetail");
    html2canvas(data!).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
  }
}
