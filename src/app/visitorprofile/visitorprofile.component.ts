import { Component, OnInit } from '@angular/core';
import { viewVisitorFields } from '../viewVisitorFields';
import { checkinInfo } from '../checkinInfo';
import { data } from '../data';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-visitorprofile',
  templateUrl: './visitorprofile.component.html',
  styleUrls: ['./visitorprofile.component.scss']
})
export class VisitorprofileComponent implements OnInit {
  public data: object[];
  constructor(private Router: Router,private ActivatedRoute: ActivatedRoute) { }
  viewVisitorStructure: any;
  checkinInfoStructure:any;
  name;
  ngOnInit(): void {
    this.data = data;
    this.viewVisitorStructure = viewVisitorFields
    this.checkinInfoStructure = checkinInfo
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.name =params['Name'].split("_")[0]+" "+params['Name'].split("_")[1];
    this.viewVisitor( this.name);
    this.checkinInfo( this.name);
    })
  }
  viewVisitor(name){
    for(var i =0 ;i<this.data.length;i++){
      if(name == this.data[i]['FullName']){
        var obj = this.data[i];
      }
    }
   (<HTMLInputElement>document.getElementById("visitorImage")).src ="assets/images/"+ obj['Image'];
    for(var i =0 ;i<this.viewVisitorStructure.length;i++){
      if(this.viewVisitorStructure[i]['FieldType'] =='text field'){
        $('#div1').append("<label class='fontColor' style='color:rgb(141 141 141);'>"+this.viewVisitorStructure[i]['Field'] + "</label><br> <input type='text' id='"+ this.viewVisitorStructure[i]['id'] +"' placeholder='" + this.viewVisitorStructure[i]['Placeholder'] + "'  style='padding-left: 15px;border: none;border-bottom: 1px solid #bfbfbf;width: 100%;height: 28px;' disabled><br><br>")
      }
    }
    $('#div1').append("<div style='display:grid;grid-template-columns: auto auto;width: 6cm;'><img style='height: 20px;width: 20px;' src='assets/images/messageIcon.png'><div style='    font-size: 14px;color: #7d6dd3;'>This Visitor was Invited</div></div>");
    $('#Name').val(obj['FullName']);
    $('#Email').val(obj['Email']);
    $('#Contact').val(obj['ContactNo']);
    $('#Purpose').val(obj['Purpose']);
    $('#Host').val(obj['Host']);
  }
  checkinInfo(name){
    for(var i =0 ;i<this.checkinInfoStructure.length;i++){
      if(this.checkinInfoStructure[i]['FieldType'] =='text field'){
        $('#div2').append("<div style='padding: 0px 22px 22px 0px;'><label style='color:rgb(141 141 141);'>"+this.checkinInfoStructure[i]['Field'] + "</label><br> <input type='text' id='"+ this.checkinInfoStructure[i]['id'] +"' placeholder='" + this.checkinInfoStructure[i]['Placeholder'] + "'  style='padding-left: 15px;border: none;border-bottom: 1px solid #bfbfbf;width: 100%;height: 28px;' disabled></div>")
      }
    }
    for(var i =0 ;i<this.data.length;i++){
      if(name == this.data[i]['FullName']){
        var obj = this.data[i];
      }
    }
    $('#Location').val(obj['Location']);
    $('#ArrivalDate').val(obj['date']);
    $('#VisitorType').val(obj['VisitorType']);
    $('#ExpectedArrivalTime').val(obj['ExpectedTime']);
    $('#ArrivalTime').val(obj['ArrivalTime']);
    $('#Status').val(obj['Status']);
    $('#Remark').val(obj['Remark']);
  }

}
