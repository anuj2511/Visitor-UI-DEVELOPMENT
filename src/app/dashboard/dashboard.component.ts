import { Component, OnInit, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { data } from '../data';
import * as $ from "jquery";
import { viewVisitorFields } from '../viewVisitorFields';
import { checkinInfo } from '../checkinInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { VisitorApiService } from '../visitor-api.service';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit ,OnChanges{
  public data: object[];
  public popupData : object[];
  public columns: any
  public start: Date;
  public end: Date;
  public page_count = 1;
  public original_data: object[];
  total_visits
  invited_visitors: number;
  images = [];
  newData = [];
  numberOfEntries = 0;
  entry_from = 1;
  entry_to = 1;
  viewVisitorStructure: any;
  checkinInfoStructure:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  constructor(private Router: Router,private ActivatedRoute: ActivatedRoute,private ApiService: VisitorApiService,public toaster: ToastrService) { }

  ngOnInit(): void {
    this.rerender();
    this.invitedVisitors();
    this.data = data;
    this.popupData = data;
    this.original_data = data;
    this.numberOfEntries = data.length;
    this.viewVisitorStructure = viewVisitorFields
    this.checkinInfoStructure = checkinInfo
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthMenu : [10, 50, 100],
      processing: true,
      order: [],
    columnDefs: [ {
        'targets': [0], /* column index [0,1,2,3]*/
        'orderable': false, /* true or false */
    }],
  //   columns: [
  //     { "width": "5%" },
  //     { "width": "15%" },
  //     { "width": "20%" },
  //     { "width": "15%" },
  //     { "width": "15%" },
  //     { "width": "15%" },
  //     { "width": "15%" }
  // ]
    };
    for (let i in data) {
      this.images[i] = data[i].Image
    }
    this.total_visits = data.length;//data.total_visits
    this.invited_visitors = data.length;//data.invited_visitors
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.querySelectorAll('input[type=search]')[0]['placeholder']= "Search";
      document.querySelectorAll('input[type=search]')[0]['className']= "SearchClass";
      $('.SearchClass').css({"width": "170px"});
      $('.SearchClass').attr('style',"border: 1px solid #e4e5e7;");
      $('.table-striped > tbody > tr:nth-of-type(odd)').attr('style',"background-color: white;");
      $('.table-striped > tbody > tr:nth-of-type(even)').attr('style',"background-color: #f9f9f9;");
    }, 100);

  }
  ngOnChanges(){
    $('.e-headertext').attr('style','color:black');
  }
  ranged() {
    this.data = this.original_data;
    var startDate = new Date($('#daterangepicker_input').val().toString().split("-")[0]);
    var endDate = new Date($('#daterangepicker_input').val().toString().split("-")[1]);
    var resultProductData = data.filter(a => {
      var date = new Date(a.date);
      return (date >= startDate && date <= endDate);
    });
    this.data = resultProductData;
  }
  redirectToVisitorProfile(name){
    if(name=== 'New'){
      this.Router.navigate(['/visitorprofile'], { queryParams: { id: "NewVisitor" } });
    }else{
      var name:any = name.split(" ")[0] + "_" + name.split(" ")[1]
      this.Router.navigate(['/visitorprofile'], { queryParams: { id: name } });
    }
  }
  showDropdown(){
    var checkList = document.getElementById('list1');
    if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}
rerender(): void{
  setTimeout(() => {
  $('.dataTables_length select').attr('style',"height: 30px !important;width: 48px !important;padding:7px 2px;border: 1px solid #e4e5e7;");
  $('.paginate_button.current').attr('style',"background: rgb(0 141 211) !important;color: white !important;");
  }, 100);
}
key:string = 'id';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    console.log(this.reverse);
  }
  columnChooser(isChecked, id){
    if(isChecked == true){
      $('.'+id).show();
    }else{
      $('.'+id).hide();
    }
  }
  invitedPopup(){
    $('#addFieldPopup').show();
  }
  hideinvitePopup(){
    $('#addFieldPopup').hide();
  }
  invitedVisitors(){
    const _self = this;
     $.ajax({
      url: "",
      type: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.ApiService.Token
      },
      success: function (res) {
        this.popupData = res;
      }, error(err) {
        _self.toaster.error('Sorry there was a problem while loading invited visitors list. Please try again.');
      }
    });
  }

}