
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export class QW {
  public static isMobile: boolean;


  public static port = window.location.port;
  public static basePath = '';
  public static host = window.location.hostname;
  public static protocol = window.location.protocol;
  public static isDev = this.port == '4200';
  public static auth = "myusername:password123";


  public static req(url: string, data: any = null, method = 'POST') {

    let apiUrl =
      (this.isDev ? 'http://' + this.host + ':3000' : '') + this.basePath;

    return fetch(apiUrl + url, {
      method: method,
      body: data,
      headers: this.auth!=""?{'Authorization': 'Basic ' + btoa(this.auth)}:{}
    });
  }




  public static async json(url: string, data: any = null, method = 'GET') {
    try {
      const res = await this.req(url, data, method);
      return await res.json();
    } catch (error) {
      console.log(error)
      return null;
    }
  }
  public static async jsonPost(url: string, data: any = null, method = 'POST') {
    try {
      const res = await this.req(url, data, method);
      return await res.json();
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  public static async text(url: string, data: any = '', method = 'GET') {
    try {
      const res = await this.req(url, data, method);
      return await res.text();
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  public static async asset(url: string) {
    try {
      const res = await fetch(url);
      return await res.text();
    } catch (error) {
      console.log(error)
      return null;
    }
  }




  public static snacCtl: any;
  public static showSnack(msg: any,action:string ,t = 3000) {
    let sc = new MatSnackBarConfig();
    sc.duration = t;
    sc.panelClass=action
    let simpleSnackBarRef = this.snacCtl.open(msg, 'Ok', sc);
    return simpleSnackBarRef;
  }

  public static async jsonUrl(url: string, data: any = '', method = 'POST') {
    let resData = await fetch(url, {
      method: method,
      body: data,
    });
    let json = await resData.json();
    return json;
  }

  public static downloadCSV(
    data: any[],
    fname: string,
    colSep = ';',
    numSep = '.'
  ) {
    let csvContent = '';

    const nl = '\r\n';
    data.forEach((r, i) => {
      let rowstr = '';
      const cols = Object.keys(r);
      if (i === 0) rowstr = cols.join(colSep) + nl;
      cols.forEach((c) => {
        let cellV = r[c];
        if (Number.isNaN(cellV) || cellV == 'NaN') cellV = '';
        if (!isNaN(cellV) && numSep != '.' && cellV)
          cellV = cellV.toString().replace('.', ',');
        rowstr += cellV + colSep;
      });
      rowstr = rowstr.slice(0, -1);
      csvContent += rowstr + nl;
    });
    let universalBOM = '\uFEFF';
    let link = document.createElement('a');
    link.setAttribute(
      'href',
      'data:text/csv; charset=utf-8,' +
      encodeURIComponent(universalBOM + csvContent)
    );
    link.setAttribute('download', fname + '.csv');
    document.body.appendChild(link);
    link.click();
  }
  public static getCSV(data: any[], fname: string) {
    let csvContent = "data:text/csv;charset=utf-8,";
    const sep = ";"
    const nl = "\r\n"
    data.forEach((r, i) => {
      let rowstr = "";
      const cols = Object.keys(r);
      if (i === 0) rowstr = cols.join(sep) + nl;
      cols.forEach(c => {
        rowstr += r[c] + sep;
      });
      rowstr = rowstr.slice(0, -1);
      csvContent += rowstr + nl;
    });
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fname + ".csv");
    document.body.appendChild(link);
    link.click();
  }

  static delayTimer: any = 0;
  public static delayEvent(callback: any, ms: any) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(callback, ms);
  }


  public static log(...data: any[]) {
    if (!QW.isDev) return;
    console.log(...data);
  }
}
