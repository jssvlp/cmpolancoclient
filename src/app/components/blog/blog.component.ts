import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  agregar: any;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {}

  ver(agregar: any, modal) {
    this.agregar = agregar;
    this.modalService.open(modal);
  }

}
