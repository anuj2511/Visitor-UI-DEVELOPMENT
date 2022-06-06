import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as $ from "jquery";
import { configurationData } from '../configurationData';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit,AfterViewInit {

  public configurationData;
  is_checked;
  Dropdownadded = 1;
  dtOptions: DataTables.Settings = {};
  checked ="";
  @ViewChild('grid') public grid: GridComponent;
  value: any;
  constructor() { }

  ngOnInit(): void {
    this.configurationData = configurationData;

    $('[data-toggle="collapse"]').on('click', function (e) {
      if ($(this).parents('.accordion').find('.collapse.in')) {
        var idx = $(this).index('[data-toggle="collapse"]');
        if (idx == $('.collapse.in').index('.collapse')) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    });
    $('#takePhoto').click(function(){
      var url = 'CameraTest.html';
      document.location.href = url;
    });
    this.dtOptions = {
      paging:false,
      searching:false,
      pageLength: 10,
      lengthMenu : [10, 50, 100],
      processing: true,
      order: [],
    columnDefs: [ {
        'targets': [0,1,2,3], /* column index [0,1,2,3]*/
        'orderable': false, /* true or false */
    }],
    columns: [
      { "width": "5%" },
      { "width": "5%" },
      { "width": "5%" },
      { "width": "5%" }
  ],scrollX: true
    };
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    this.updatePreview();
    }, 100);
  }
  addFieldPopup() {
    $("#addFieldPopup").show();
    $("#addFieldPopupTop").show();
  }
  previewPoster() {
    $("#PreviewPostor").show();
    $("#PreviewPostor1").show();
  }
  headerCellInfo(args) {
    args.node.getElementsByClassName("e-checkbox-wrapper")[0] && args.node.getElementsByClassName("e-checkbox-wrapper")[0].remove();
  }
  addField(x) {
    if (x == 'close') {
      $("#addFieldPopup").hide();
      $("#addFieldPopupTop").hide();
    } else {
      var data = {
        Field: $("#fieldLabel").val(),
        FieldType: $("#fieldLabel").val(),
        Mandatory: $("#Mandatory").val()
      }
      this.configurationData[this.configurationData.length] = data;
      this.grid.refreshColumns();
      $("#addFieldPopup").hide();
      $(".addFieldPopup").hide();
      this.updatePreview();
    }
  }
  updatePreview() {
    $("#preview").empty();
    for (var a in configurationData) {
      if (configurationData[a]['Field'] === "Take Photo") {
        $("#preview").append('<div id="takePhoto" style="display: flex;justify-content: center;"><img src="assets/images/TakePhoto.png" alt="take photo" width="45" height="40"></div><div style="display: flex;justify-content: center;"><div>Take Photo</div></div>')
      } else {
        $("#preview").append("<div style='padding: 4px 0px 5px 19px;'><input type ='" + configurationData[a].FieldType + "' placeholder= '" + configurationData[a].Field + "' style='height: 27px;width: 245px;border:1px solid rgb(119 9 223)' ></div>")
      }
    }
  }
  updatePreview1() {
    $("#preview1").empty();
    if ($("#fieldType").val() === "text") {
      $("#dropdownOptionNew").empty()
      this.Dropdownadded = 1;
      $("#preview1").append("<div style='padding: 7px 25px 5px 115px;'><input type ='" + $("#fieldType").val() + "' placeholder='" + $("#fieldLabel").val() + "' style='height: 27px;width: 245px;border:1px solid rgb(119 9 223)' ></div>")
    } else if ($("#fieldType").val() === "dropdown") {
      $("#preview1").append("<div style='padding: 7px 25px 5px 115px;'><select style='height: 27px;width: 245px;border:1px solid rgb(119 9 223)' id='Dropdownadding' style></select></div>");
      for (var i = 1; i <= this.Dropdownadded; i++) {
        var id = '#dropdownOption' + i.toString();
        this.value = $(id).val();
        //$('#dropdownOption').val();
        $("#Dropdownadding").append("<option>" + this.value + "</option>")
      }
    }
  }
  addMoreDropdown() {
    this.Dropdownadded++
    $("#dropdownOptionNew").append(" <input _ngcontent-c1 style='width:100%' type='text' id='dropdownOption" + this.Dropdownadded + "' placeholder='option " + this.Dropdownadded + "' value= '' (keyup)='updatePreview1()'>");
  }

}
