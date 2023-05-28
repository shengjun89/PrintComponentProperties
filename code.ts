// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {width: 320, height:320, title:"Print Component Properties"});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.loadFontAsync({ family: "PingFang SC", style: "Regular" });
figma.loadFontAsync({ family: "Inter", style: "Regular" });
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'anctionCreate') {
    const {bgColor, tableWidth, desc, circleSize} = msg.formDataObj;
    // console.log(msg.formDataObj);

    let selectedElements = figma.currentPage.selection.length;
    if (selectedElements === 0) {
      figma.notify('🙅‍♂️没有选择任何对象~');
      return (false);
    }
    if (selectedElements > 1) {
      figma.notify('🙅‍♂️请选择1个组件对象~');
      return (false);
    }
    if (figma.currentPage.selection[0].type !== 'COMPONENT_SET') {
      figma.notify('🙅‍♂️请选择有创建属性的组件对象打印~');
      return (false);
    }

    if (msg.formDataObj.tableWidth < 900){
      msg.formDataObj.tableWidth = 900;
      figma.notify('😈最小宽度为900');
    } 

    if (msg.formDataObj.tableWidth > 2000){
      msg.formDataObj.tableWidth = 2000;
      figma.notify('😈最大宽度为2000');
    } 

    let thisX = figma.currentPage.selection[0].x;
    let thisY = figma.currentPage.selection[0].y;

    
    //创建一个变量prop获取组件属性键值对，创建propNameArr数组存储组件属性名称
    
    let propValueGroup = [];
    
    

    function Createtable(){
      let propNameArr = [];

      //创建最外层的table
      const properties = figma.createFrame();
      properties.name = figma.currentPage.selection[0].name+'-properties';
      properties.itemSpacing = 0;
      properties.layoutMode = "HORIZONTAL";
      properties.counterAxisAlignItems = "MIN";
      properties.counterAxisSizingMode = "AUTO";
      properties.primaryAxisAlignItems = "MIN";
      properties.primaryAxisSizingMode = "AUTO";
      properties.fills = [];
      properties.x = thisX - msg.formDataObj.tableWidth;
      properties.y = thisY;

      //创建三列
      const columns: FrameNode[] = [];
      for(let i=0; i<3; i++){
        let column = figma.createFrame();
        column.itemSpacing = 0;
        column.name = 'column';
        column.layoutMode = "VERTICAL";
        column.counterAxisAlignItems = "MIN";
        column.counterAxisSizingMode = "AUTO";
        column.primaryAxisAlignItems = "MIN";
        column.primaryAxisSizingMode = "AUTO";
        column.fills = [{ type: "SOLID", color: { r: 0.9750000238418579, g: 0.9750000238418579, b: 0.9750000238418579 } }];
        column.y = thisY;
        properties.appendChild(column);
        columns.push(column)
      }

      //创建第一列
      const col01Hd = figma.createFrame();
      col01Hd.itemSpacing = 8;
      col01Hd.name = 'cell01-head';
      col01Hd.paddingLeft = 24;
      col01Hd.paddingRight = 24;
      col01Hd.paddingTop = 28;
      col01Hd.paddingBottom = 28;
      col01Hd.counterAxisAlignItems = "CENTER";
      col01Hd.counterAxisSizingMode = "AUTO";
      col01Hd.primaryAxisAlignItems = "MIN";
      col01Hd.primaryAxisSizingMode = "FIXED";
      col01Hd.layoutAlign = 'STRETCH';
      col01Hd.layoutMode = 'HORIZONTAL';
      col01Hd.fills = [];
      col01Hd.strokeBottomWeight = 1;
      col01Hd.strokeRightWeight = 1;
      col01Hd.strokes = [{ type: "SOLID", color: { r: 0.8901960849761963, g: 0.8823529481887817, b: 0.9019607901573181 } }];
      // col01.push(col01Hd);
      columns[0].appendChild(col01Hd);
      
      let col01Hdtxt: TextNode = figma.createText();
      col01Hdtxt.characters = '属性';
      col01Hdtxt.fontName = {family: 'PingFang SC', style: 'Regular'};
      col01Hdtxt.fontSize = 14;
      col01Hdtxt.textAutoResize = 'WIDTH_AND_HEIGHT';
      col01Hdtxt.textAlignVertical = 'CENTER';
      col01Hdtxt.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      col01Hd.appendChild(col01Hdtxt);
      col01Hdtxt.resize(252,24);
      

      let props:ComponentSetNode = figma.currentPage.selection[0].componentPropertyDefinitions;
      for (let i in props){
        propNameArr.push(i);
        // console.log(i);
      }
      
      for (let i=0; i<propNameArr.length; i++){
        let col01cell = figma.createFrame();
        col01cell.paddingLeft = 24;
        col01cell.paddingRight = 24;
        col01cell.paddingTop = 28;
        col01cell.paddingBottom = 28;
        col01cell.counterAxisAlignItems = "CENTER";
        col01cell.counterAxisSizingMode = 'AUTO';
        col01cell.primaryAxisAlignItems = 'MIN';
        col01cell.primaryAxisSizingMode = 'AUTO';
        col01cell.layoutAlign = 'STRETCH';
        col01cell.layoutMode = 'VERTICAL';
        col01cell.fills = [];
        col01cell.strokeBottomWeight = 1;
        col01cell.strokeRightWeight = 1;
        col01cell.strokes = [{ type: "SOLID", color: { r: 0.8901960849761963, g: 0.8823529481887817, b: 0.9019607901573181 } }];
        col01cell.name = propNameArr[i];
        columns[0].appendChild(col01cell);

        let col01celltxt: TextNode = figma.createText();
        col01celltxt.characters = propNameArr[i].split('#')[0];
        col01celltxt.fontSize = 14;
        col01celltxt.textAutoResize = 'WIDTH_AND_HEIGHT';
        col01celltxt.textAlignVertical = 'CENTER';
        col01celltxt.layoutAlign = 'STRETCH';
        col01celltxt.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
        col01celltxt.resize(252,25);
        col01cell.appendChild(col01celltxt);
      }

      columns[0].fills = [{ type: "SOLID", color: { r: 0.9587496519088745, g: 0.9587496519088745, b: 0.9587496519088745 } }];
      // 第二列

      const col02Hd:FrameNode = figma.createFrame();
      col02Hd.itemSpacing = 8;
      col02Hd.name = 'cell02-head';
      col02Hd.paddingLeft = 24;
      col02Hd.paddingRight = 24;
      col02Hd.paddingTop = 28;
      col02Hd.paddingBottom = 28;
      col02Hd.counterAxisAlignItems = "CENTER";
      col02Hd.counterAxisSizingMode = "AUTO";
      col02Hd.primaryAxisAlignItems = "MIN";
      col02Hd.primaryAxisSizingMode = "FIXED";
      col02Hd.layoutAlign = 'STRETCH';
      col02Hd.layoutMode = 'HORIZONTAL';
      col02Hd.fills = [];
      col02Hd.strokeBottomWeight = 1;
      col02Hd.strokeRightWeight = 1;
      col02Hd.strokes = [{ type: "SOLID", color: { r: 0.8901960849761963, g: 0.8823529481887817, b: 0.9019607901573181 } }];
      columns[1].appendChild(col02Hd);

      let col02Hdtxt: TextNode = figma.createText();
      col02Hdtxt.characters = '属性值';
      col02Hdtxt.fontName = {family: 'PingFang SC', style: 'Regular'};
      col02Hdtxt.fontSize = 14;
      col02Hdtxt.textAutoResize = 'WIDTH_AND_HEIGHT';
      col02Hdtxt.textAlignVertical = 'CENTER';
      col02Hdtxt.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];;
      col02Hdtxt.resize(msg.formDataObj.tableWidth-552-96,25);
      columns[1].children[0].appendChild(col02Hdtxt);
      // console.log(msg.col01);

      for (let i in props){
        let col02cell = figma.createFrame();
        col02cell.itemSpacing = 8;
        col02cell.paddingLeft = 24;
        col02cell.paddingRight = 24;
        col02cell.paddingTop = 28;
        col02cell.paddingBottom = 28;
        col02cell.counterAxisAlignItems = "CENTER";
        col02cell.counterAxisSizingMode = 'AUTO';
        col02cell.primaryAxisAlignItems = 'MIN';
        col02cell.primaryAxisSizingMode = 'FIXED';
        col02cell.layoutAlign = 'STRETCH';
        col02cell.layoutMode = 'HORIZONTAL';
        col02cell.fills = [];
        col02cell.strokeBottomWeight = 1;
        col02cell.strokeRightWeight = 1;
        col02cell.strokes = [{ type: "SOLID", color: { r: 0.8901960849761963, g: 0.8823529481887817, b: 0.9019607901573181 } }];
        col02cell.name = 'cell';
        columns[1].appendChild(col02cell);

        function CreateCell02(a){
          if (typeof a == 'string'){
            //返回值是字符串，塞到创建的cell02isType盒子里
            const cell02isType: FrameNode = figma.createFrame();
            cell02isType.itemSpacing = 8;
            cell02isType.name = 'TPYE';
            cell02isType.paddingBottom = 4;
            cell02isType.paddingTop = 4;
            cell02isType.paddingLeft = 6;
            cell02isType.paddingRight= 6;
            cell02isType.counterAxisAlignItems = "CENTER";
            cell02isType.counterAxisSizingMode = "AUTO";
            cell02isType.primaryAxisAlignItems = "MIN";
            cell02isType.primaryAxisSizingMode = "AUTO";
            cell02isType.layoutAlign = 'INHERIT';
            cell02isType.layoutMode = 'HORIZONTAL';
            cell02isType.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
            cell02isType.cornerRadius = parseInt(circleSize, 10);
            cell02isType.strokeWeight = 1;
            cell02isType.strokes = [{ type: "SOLID", color: { r: 0.8901960849761963, g: 0.8823529481887817, b: 0.9019607901573181 } }];
            col02cell.appendChild(cell02isType);


            let isTpyetxt: TextNode = figma.createText();
            isTpyetxt.characters = a;
            isTpyetxt.fontSize = 14;
            isTpyetxt.textAutoResize = 'WIDTH_AND_HEIGHT';
            isTpyetxt.textAlignVertical = 'CENTER';
            isTpyetxt.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];;
            cell02isType.appendChild(isTpyetxt);
          } 
          else {
            for (let i=0; i<a.length; i++){
              const cell02isVariant:FrameNode = figma.createFrame();
              cell02isVariant.itemSpacing = 8;
              cell02isVariant.name = 'VARIANT';
              cell02isVariant.paddingBottom = 4;
              cell02isVariant.paddingTop = 4;
              cell02isVariant.paddingLeft = 6;
              cell02isVariant.paddingRight= 6;
              cell02isVariant.counterAxisAlignItems = "CENTER";
              cell02isVariant.counterAxisSizingMode = "AUTO";
              cell02isVariant.primaryAxisAlignItems = "MIN";
              cell02isVariant.primaryAxisSizingMode = "AUTO";
              cell02isVariant.layoutAlign = 'INHERIT';
              cell02isVariant.layoutMode = 'HORIZONTAL';
              cell02isVariant.fills = [{ type: "SOLID", color: { r: 0.9420987367630005, g: 0.9420987367630005, b: 0.9420987367630005 } }];
              cell02isVariant.cornerRadius = parseInt(circleSize, 10);;
              cell02isVariant.strokeWeight = 1;
              cell02isVariant.strokes = [{ type: "SOLID", color: { r: 0.8901960849761963, g: 0.8823529481887817, b: 0.9019607901573181 } }];
              col02cell.appendChild(cell02isVariant);

              let isVariantTxt: TextNode = figma.createText();
              isVariantTxt.characters = a[i];
              isVariantTxt.fontSize = 14;
              isVariantTxt.textAutoResize = 'WIDTH_AND_HEIGHT';
              isVariantTxt.textAlignVertical = 'CENTER';
              isVariantTxt.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];;
              // col02Celltxt.resize(512,24);
              cell02isVariant.appendChild(isVariantTxt);
            }
          }
          // console.log(props[i].variantOptions);
        }
        
        if (props[i].type === 'VARIANT'){
          CreateCell02(props[i].variantOptions)
        }else{
          CreateCell02(props[i].type)
        }
      }
      // 第三列

      const col03Hd:FrameNode = figma.createFrame();
      col03Hd.itemSpacing = 8;
      col03Hd.name = 'cell03-head';
      col03Hd.paddingLeft = 24;
      col03Hd.paddingRight = 24;
      col03Hd.paddingTop = 28;
      col03Hd.paddingBottom = 28;
      col03Hd.counterAxisAlignItems = "CENTER";
      col03Hd.counterAxisSizingMode = "AUTO";
      col03Hd.primaryAxisAlignItems = "MIN";
      col03Hd.primaryAxisSizingMode = "FIXED";
      col03Hd.layoutAlign = 'STRETCH';
      col03Hd.layoutMode = 'HORIZONTAL';
      col03Hd.fills = [];
      col03Hd.strokeBottomWeight = 1;
      // col03Hd.strokeRightWeight = 1;
      col03Hd.strokes = [{ type: "SOLID", color: { r: 0.8901960849761963, g: 0.8823529481887817, b: 0.9019607901573181 } }];
      columns[2].appendChild(col03Hd);

      let col03Hdtxt: TextNode = figma.createText();
      col03Hdtxt.characters = '描述';
      col03Hdtxt.fontName = {family: 'PingFang SC', style: 'Regular'};
      col03Hdtxt.fontSize = 14;
      col03Hdtxt.textAutoResize = 'WIDTH_AND_HEIGHT';
      col03Hdtxt.textAlignVertical = 'CENTER';
      
      col03Hdtxt.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      col03Hdtxt.resize(252,25);
      
      columns[2].children[0].appendChild(col03Hdtxt);

      for (let i=0; i<propNameArr.length; i++){
        let col03cell = figma.createFrame();
        col03cell.paddingLeft = 24;
        col03cell.paddingRight = 24;
        col03cell.paddingTop = 28;
        col03cell.paddingBottom = 28;
        col03cell.counterAxisAlignItems = "CENTER";
        col03cell.counterAxisSizingMode = 'AUTO';
        col03cell.primaryAxisAlignItems = 'MIN';
        col03cell.primaryAxisSizingMode = 'AUTO';
        col03cell.layoutAlign = 'STRETCH';
        col03cell.layoutMode = 'VERTICAL';
        col03cell.strokeBottomWeight = 1;
        col03cell.strokeRightWeight = 1;
        col03cell.strokes = [{ type: "SOLID", color: { r: 0.8901960849761963, g: 0.8823529481887817, b: 0.9019607901573181 } }];
        col03cell.fills = [];

        col03cell.name = 'cell';
        columns[2].appendChild(col03cell);

        let col03celltxt: TextNode = figma.createText();
        col03celltxt.characters = desc;
        col03celltxt.fontSize = 14;
        col03celltxt.fontName = {family: 'PingFang SC', style: 'Regular'};
        col03celltxt.textAutoResize = 'WIDTH_AND_HEIGHT';
        col03celltxt.textAlignVertical = 'CENTER';
        col03celltxt.layoutAlign = 'STRETCH';
        col03celltxt.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
        col03celltxt.resize(252,25);
        col03cell.appendChild(col03celltxt);
      }
      figma.notify('👻打印成功~');

    }
    Createtable()

    //创建一个空数组，把打印的table塞进该数组
    let arrNew = [];
    arrNew.push(figma.currentPage.children[figma.currentPage.children.length - 1]);
    figma.viewport.scrollAndZoomIntoView(arrNew);
    
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};