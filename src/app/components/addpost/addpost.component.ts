import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  agregar: any;
  addForm: FormGroup;

  constructor(private modalService: NgbModal, private FormBuilder: FormBuilder) { }

  ngOnInit() {}

  ver(agregar: any, modal) {
    this.agregar = agregar;
    this.modalService.open(modal);
  }
}
