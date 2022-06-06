import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { data } from '../data';
import { PageSettingsModel,FilterSettingsModel,ToolbarItems,GridComponent } from '@syncfusion/ej2-angular-grids';
import * as $ from "jquery";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss']
})
export class InvitesComponent implements OnInit ,AfterViewInit{

  public data: object[];
  public pagesettings: PageSettingsModel;
  public filtersettings: FilterSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public columns: any
  // public month: number = new Date().getMonth();
  // public fullYear: number = new Date().getFullYear();
  public start: ""
  public end: "";
  public page_count = 1;
  public original_data: object[];
  @ViewChild('grid') public grid: GridComponent;
  //public a = parseInt($("#sizeChange").val());
  total_visits
  invited_visitors: number;
  images=[];
  newData=[];
  numberOfEntries=0;
  FullName;
  Location;
  ArrivalDate;
  ArrivalTime;
  HostName;
  LocationAddress;
  menu_hide: boolean = false;
  dtOptions: DataTables.Settings = {};
  constructor(private Router: Router,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = data;
    this.original_data = data;
    this.numberOfEntries = data.length;
    this.showBoard();
    //$("#firstTimeVisitor").show();
    this.FullName = this.data[0]['FullName'] ;
    this.Location = this.data[0]['Location'] ;
    this.ArrivalDate= this.data[0]['ArrivalDate'] ;
    this.ArrivalTime= this.data[0]['ArrivalTime'] ;
    this.HostName= this.data[0]['Host'] ;
    this.LocationAddress= this.data[0]['Location'] ;
    for(let i in data){
      this.images[i] = data[i].Image
    }
    this.filtersettings = { ignoreAccent: true }
    this.toolbarOptions = ['Search', 'ColumnChooser'];
    this.pagesettings = { pageSizes: ['2', '3', 'All'] }
    $("#date1").val(new Date().toLocaleDateString())
    //this.columns=[{field:"EmployeeID",fieldName :"EmployeeID"}]
    //this.grid.refreshColumns();
    // for (var i = 1; i <= data.length; i++) {
    //   if ((data.length > 10 && i == 10) || (data.length < 10 && i == data.length)) {
    //     $("#sizeChange").append("<option value=" + i + " selected>" + i + "</option>");
    //   } else {
    //     $("#sizeChange").append("<option value=" + i + ">" + i + "</option>");
    //   }
    // }
    this.total_visits = data.length;//data.total_visits
    this.invited_visitors = data.length;//data.invited_visitors
    $('#takePhoto').click(function(){
      var url = 'C:/Users/91993/Desktop/Take Photo/HR_Upload_Photo/HR_Upload_Photo/CameraTest.html';
      document.location.href = url;
    });
    this.dtOptions = {
      searching:false,
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthMenu : [10, 50, 100],
      processing: true,
      order: [],
    columnDefs: [ {
        'targets': [0,1], /* column index [0,1,2,3]*/
        'orderable': false, /* true or false */
    }],
    columns: [
      { "width": "2%" },
      { "width": "5%" },
      { "width": "15%" },
      { "width": "20%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%" }
  ]
    };
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      $('div.dataTables_length select').attr('style','display:none !important');
      $('div.dataTables_length label').attr('style','display:none !important');
      $('.table-striped > tbody > tr:nth-of-type(odd)').attr('style',"background-color: white;");
      $('.table-striped > tbody > tr:nth-of-type(even)').attr('style',"background-color: #f9f9f9;");
    }, 100);
  }
  changeSize() {
    this.data = this.original_data;
    let a:any=$("#sizeChange").val(); 
    this.pagesettings = { pageSize: parseInt(a) }
  }
  ranged(){
    this.data = this.original_data;
    var startDate =new Date($('#daterangepicker_input').val().toString().split("-")[0]);
    var endDate = new Date($('#daterangepicker_input').val().toString().split("-")[1]);
    var resultProductData = data.filter(a => {
      var date = new Date(a.date);
      return (date >= startDate && date <= endDate);
    });
    this.data = resultProductData;
  }
  paginating(direction) {
    if(this.data.length >0){
    var a =0;
    this.data = this.original_data;
    for (let i = 0; i < this.data.length; i += this.pagesettings.pageSize) {
      a++
      this.newData[a] = this.data.slice(i, i + this.pagesettings.pageSize);
  }
    if(direction == 'previous' ){
      if(this.page_count<=1){
        
      }else{
        this.page_count--;
        this.data= this.newData[this.page_count];
      }
    }else if(direction == 'next'){
      this.page_count++;
      this.data= this.newData[this.page_count];
    }
  }
}
redirectToVisitorProfile(name){
  var name:any = name.split(" ")[0] + "_" + name.split(" ")[1]
  this.Router.navigate(['/visitorprofile'], { queryParams: { Name: name } });

}
showBoard(){
  $('#inviteBoard').show();
  $('#sendInviteDiv').hide();
  $('#EmailPopup').hide();
  // $('#sendInviteDiv').css('display', 'none');
  // $('#inviteBoard').css('display', 'block');
}
sendInvite(){
  $('#sendInviteDiv').show();
  $('#inviteBoard').hide();
  $('#EmailPopup').hide();
  // $('#inviteBoard').css('display', 'none');
  // $('#sendInviteDiv').css('display', 'block');
  this.menu_hide = true;
}
registerNow(){
  $('#EmailPopup').show();
  $('#sendInviteDiv').hide();
  $('#inviteBoard').hide();
  $("#RegisterNow").hide();
  $("#RegisterNow1").hide();

}
Invite() {
  $("#RegisterNow").show();
  $("#RegisterNow1").show();
  $('#sendInviteDiv').hide();
  $('#inviteBoard').hide();
}
firstTimeVisitor(){
  $('#EmailPopup').hide();
  $('#sendInviteDiv').hide();
  $('#inviteBoard').hide();
  $("#RegisterNow").hide();
  $("#RegisterNow1").hide();
  $("#firstTimeVisitor").show();
  $(".preCheckIn").show();
}
notTimeVisitor(){
  $('#EmailPopup').hide();
  $('#sendInviteDiv').hide();
  $('#inviteBoard').hide();
  $("#RegisterNow").hide();
  $("#RegisterNow1").hide();
  $("#firstTimeVisitor").show();
  $(".checkIn").show();
}
showThankYou(){
  $('#EmailPopup').hide();
  $('#sendInviteDiv').hide();
  $('#inviteBoard').hide();
  $("#RegisterNow").hide();
  $("#RegisterNow1").hide();
  $("#firstTimeVisitor").hide();
  $("#thankYou").show();
}

showPreview(isChecked){
   if(isChecked){
     $("#preview").show();
     $("#noPreview").hide();
   }else{
    $("#preview").hide();
    $("#noPreview").show();
   }
}
}
