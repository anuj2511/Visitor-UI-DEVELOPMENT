import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { data } from '../data';
import { PageSettingsModel, FilterSettingsModel, ToolbarItems, GridComponent } from '@syncfusion/ej2-angular-grids';
import * as $ from "jquery";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { VisitorApiService } from '../visitor-api.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss']
})
export class InvitesComponent implements OnInit, AfterViewInit {
  public toastr: ToastrService;
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
  images = [];
  newData = [];
  numberOfEntries = 0;
  FullName;
  Location;
  ArrivalDate;
  ArrivalTime;
  HostName;
  LocationAddress;
  menu_hide: boolean = false;
  dtOptions: DataTables.Settings = {};
  emailPreview = true;
  temp_data = [
    {
      "_id": "62b2f24f672bcd67d730e3f0",
      "name": "Pramod Patil",
      "email": "pramodpatil50@gmail.com"
    },
    {
      "_id": "62b40134135bd02d3c12e85b",
      "name": "Anuj singh",
      "email": "anuj@qhrm.io"
    },
    {
      "_id": "62b40134135bd02d3c12e85a",
      "name": "Anuj singh",
      "email": "anuj@qhrm.io"
    }
  ];
  constructor(private Router: Router, private ActivatedRoute: ActivatedRoute, private ApiService: VisitorApiService, public toaster: ToastrService) { }

  ngOnInit(): void {
    this.data = data;
    this.original_data = data;
    this.numberOfEntries = data.length;
    this.showBoard();
    //$("#firstTimeVisitor").show();
    // this.FullName = this.data[0]['FullName'] ;
    this.Location = this.data[0]['Location'];
    this.ArrivalDate = this.data[0]['ArrivalDate'];
    // this.ArrivalTime = this.data[0]['ArrivalTime'];
    this.HostName = this.data[0]['Host'];
    this.LocationAddress = this.data[0]['Location'];
    for (let i in data) {
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
    $('#takePhoto').click(function () {
      var url = 'C:/Users/91993/Desktop/Take Photo/HR_Upload_Photo/HR_Upload_Photo/CameraTest.html';
      document.location.href = url;
    });
    this.dtOptions = {
      searching: false,
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthMenu: [10, 50, 100],
      processing: true,
      order: [],
      columnDefs: [{
        'targets': [0, 1], /* column index [0,1,2,3]*/
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
    /*
    (<any>$('#Fullname')).autocomplete({
      source: function (request, response) {
          var append_data = [];
          var str = $("#Fullname").val() as any;
          append_data = this.temp_data.filter(function (name) {
              return ((name.name).toLowerCase()).indexOf(str.toLowerCase()) >= 0;
          });
          response($.map(append_data, function (index, val) {
              return {label: index.name +'-'+index.email, value: index._id};
          }));
      },
      minLength: 0,
      select: function (event, ui) {
          if (ui.item.label == null || ui.item.value == null)
              return false;
          $("#Fullname").val(ui.item.label); //ui.item is your object from the array
          $("#NameId").val(ui.item.value);
          return false;
      },
      change: function (event, ui) {
          if (ui.item == null) {
              $("#NameId").val("");
              return false;
          }
      }
      //change: function () { $("#FinancierCode").val(""); } 
    });*/
    this.getUsers();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      $('div.dataTables_length select').attr('style', 'display:none !important');
      $('div.dataTables_length label').attr('style', 'display:none !important');
      $('.table-striped > tbody > tr:nth-of-type(odd)').attr('style', "background-color: white;");
      $('.table-striped > tbody > tr:nth-of-type(even)').attr('style', "background-color: #f9f9f9;");
    }, 100);
    // (<any>$('#Fullname')).autocomplete({
    //   source: this.temp_data
    // })
  }
  listFormatter(data:any): string{
    return `${data['name']} ${data['email']}`;
  }
  valueListFormatter(data:any): string{
    return `${data['name']}`;
  }
  changeSize() {
    this.data = this.original_data;
    let a: any = $("#sizeChange").val();
    this.pagesettings = { pageSize: parseInt(a) }
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
  paginating(direction) {
    if (this.data.length > 0) {
      var a = 0;
      this.data = this.original_data;
      for (let i = 0; i < this.data.length; i += this.pagesettings.pageSize) {
        a++
        this.newData[a] = this.data.slice(i, i + this.pagesettings.pageSize);
      }
      if (direction == 'previous') {
        if (this.page_count <= 1) {

        } else {
          this.page_count--;
          this.data = this.newData[this.page_count];
        }
      } else if (direction == 'next') {
        this.page_count++;
        this.data = this.newData[this.page_count];
      }
    }
  }
  redirectToVisitorProfile(name) {
    var name: any = name.split(" ")[0] + "_" + name.split(" ")[1]
    this.Router.navigate(['/visitorprofile'], { queryParams: { id: name } });

  }
  showBoard() {
    $('#inviteBoard').show();
    $('#sendInviteDiv').hide();
    $('#EmailPopup').hide();
    // $('#sendInviteDiv').css('display', 'none');
    // $('#inviteBoard').css('display', 'block');
  }
  sendInvite() {
    $('#sendInviteDiv').show();
    $('#inviteBoard').hide();
    $('#EmailPopup').hide();
    // $('#inviteBoard').css('display', 'none');
    // $('#sendInviteDiv').css('display', 'block');
    this.menu_hide = true;
  }
  registerNow() {
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
  firstTimeVisitor() {
    $('#EmailPopup').hide();
    $('#sendInviteDiv').hide();
    $('#inviteBoard').hide();
    $("#RegisterNow").hide();
    $("#RegisterNow1").hide();
    $("#firstTimeVisitor").show();
    $(".preCheckIn").show();
  }
  notTimeVisitor() {
    $('#EmailPopup').hide();
    $('#sendInviteDiv').hide();
    $('#inviteBoard').hide();
    $("#RegisterNow").hide();
    $("#RegisterNow1").hide();
    $("#firstTimeVisitor").show();
    $(".checkIn").show();
  }
  showThankYou() {
    $('#EmailPopup').hide();
    $('#sendInviteDiv').hide();
    $('#inviteBoard').hide();
    $("#RegisterNow").hide();
    $("#RegisterNow1").hide();
    $("#firstTimeVisitor").hide();
    $("#thankYou").show();
  }

  showPreview(isChecked) {
    if (isChecked) {
      $("#preview").show();
      $("#noPreview").hide();
      this.emailPreview = true;
    } else {
      $("#preview").hide();
      $("#noPreview").show();
      this.emailPreview = false;
    }
  }

  inviteVisitor() {
    var url = "https://localhost:7154/visitors/v2/invitation";
    var obj = {
      "Name": $('#Fullname').val(),
      "Email": $('#inviteEmail').val(),
      "Mobile": $('#inviteContact').val(),
      "Purpose": $('#invitePurpose').val(),
      "SendEmailPreviewFor": this.emailPreview,
      "Hosts":
        [
          {
            "Name": "Sanjay",
            "GuidStr": "41933C5F8B4C4E0898C6AC24F49AB89F"
          }
        ],
      "events": [
        {
          // "start": $('#inviteArrivalDate').val() + 'T' + $('#inviteArrivalTime').val(),
          "start": $('#inviteArrivalDate').val(),
          "duration": "PT60M",
          "enabled": true
        }
      ]
    }
    const _self = this;
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.ApiService.Token
      },
      dataType: "json",
      success: function (res) {
        _self.toaster.success('Invited successfully.');
        console.log(res);
      },
      error(err) {
        console.log(err);
        _self.toaster.error('Sorry there was a problem while inviting. Please try again.');
      }
    });
  }
  onkeyPressData(tag) {
    if (tag == 'name') {
      this.FullName = $('#Fullname').val();
    }
    if (tag == 'date') {
      this.ArrivalDate = moment($('#inviteArrivalDate').val()).format('YYYY-MM-DD HH:mm');
    }
    // if(tag == 'time'){
    //   this.ArrivalTime = $('#inviteArrivalTime').val();
    // }
    // if(tag == 'email'){
    //   this.FullName = $('#Fullname').val();
    // }
    // if(tag == 'contact'){
    //   this.FullName = $('#Fullname').val();
    // }
    // if(tag == 'purpose'){
    //   this.FullName = $('#Fullname').val();
    // }
  }
  getUsers() {
    const _self = this;
    $.ajax({
      url: "https://localhost:7154/visitors/v2/details?VisitorName=ramo&VisitorEmail=patil",
      type: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.ApiService.Token
      },
      success: function (res) {
        // this.toaster.success('updated successfully.');
        var obj = res;
        this.temp_data = res;
      }, error(err) {
        _self.toaster.error('Sorry there was a problem while loading user data. Please try again.');
        console.log('/visitors/v2/details/---' + err);
      }
    });
  }
  getVisitor(data) {
    var id = data._id;
    $('#inviteEmail').val(data.email);
    const _self = this;
    $.ajax({
      url: "https://localhost:7154/visitors/v2/details/" + id,
      type: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.ApiService.Token
      },
      success: function (res) {
        // this.toaster.success('updated successfully.');
        var obj = res;
        (<HTMLInputElement>document.getElementById("visitorImage")).src = obj['imageUrl'];
        $('#Fullname').val(obj['name']);
        $('#inviteEmail').val(obj['email']);
        $('#inviteContact').val(obj['mobile']);
        $('#invitePurpose').val(obj['Purpose']);
        $('#inviteHost').val(obj['Host']);
      }, error(err) {
        _self.toaster.error('Sorry there was a problem while loading. Please try again.');
        console.log('/visitors/v2/details/---' + err);
      }
    });
  }
}
