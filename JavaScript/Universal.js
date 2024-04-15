//might want to see about using inner height not 100vh. 100vh can create a few problems also centering seems to be off by a bit
//maybe combine all the center functions into one (use this link https://javascript.info/closure#:~:text=A%20function%20is%20called%20%E2%80%9Cnested,to%20do%20this%20with%20JavaScript.&text=Here%20the%20nested%20function%20getFullName,can%20return%20the%20full%20name.)


function HTML_Element_Centerer()
{
    function get_Element_Size_As_Percentage_Of_Parent_Element(html_Element)
    {
        var sizes=[];
        sizes.push((html_Element.offsetHeight/html_Element.parentElement.offsetHeight)*100);
        sizes.push((html_Element.offsetWidth/html_Element.parentElement.offsetWidth)*100);
        return sizes;
    }
    function center_HTML_Element_Vertically(html_Element)
    {
        //may be best to figure out how to do this with margin
        html_Element.style.top="0px";
        html_Element.style.top=(50-(get_Element_Size_As_Percentage_Of_Parent_Element(html_Element)[0]/2).toString()+"%");
    }
    function center_HTML_Element_Horizontally(html_Element)
    {
        //may be best to figure out how to do this with margin
        html_Element.style.left="0px";
        html_Element.style.left=(50-(get_Element_Size_As_Percentage_Of_Parent_Element(html_Element)[1]/2).toString()+"%");
    }    
    function center_HTML_Element(html_Element)
    {
        center_HTML_Element_Horizontally(html_Element);
        center_HTML_Element_Vertically(html_Element);
    }
    HTML_Element_Centerer.center_HTML_Element=center_HTML_Element;
    HTML_Element_Centerer.center_HTML_Element_Horizontally=center_HTML_Element_Horizontally;
    HTML_Element_Centerer.center_HTML_Element_Vertically=center_HTML_Element_Vertically;
}
function set_Min_Size_To_Size_Of_Child_Elements(html_Element)
{
    function convert_Dimension_To_Int(dimension)
    {
        return parseInt(dimension.replace('px', ''));
    }
    function increase_Parent_Height(html_Element)
    {
        if(html_Element.parentElement.id=="main_Body" || html_Element.parentElement.tagName=="BODY")
        {
            return html_Element.parentElement;
        }
        html_Element.parentElement.style.height=(convert_Dimension_To_Int(window.getComputedStyle(html_Element.parentElement, null).getPropertyValue('height'))+(convert_Dimension_To_Int(new_Height)-convert_Dimension_To_Int(old_Height)))+'px';
        return html_Element.parentElement;
    }
    
    var old_Height=window.getComputedStyle(html_Element, null).getPropertyValue('height');
    for(child_Element of html_Element.children)
    {
        var baseline=convert_Dimension_To_Int(window.getComputedStyle(child_Element, null).getPropertyValue('top'))+convert_Dimension_To_Int(window.getComputedStyle(child_Element, null).getPropertyValue('height'));
        if(convert_Dimension_To_Int(window.getComputedStyle(child_Element, null).getPropertyValue('top')) < 0)
        {
            baseline+=2*Math.abs(convert_Dimension_To_Int(window.getComputedStyle(child_Element, null).getPropertyValue('top')));
        }
        if(baseline + screen.height/20 >convert_Dimension_To_Int(window.getComputedStyle(html_Element, null).getPropertyValue('height')))
        {
            html_Element.style.height=baseline + screen.height/20 +'px';
            console.log(screen.height);
        }
    }
    var new_Height=window.getComputedStyle(html_Element, null).getPropertyValue('height');
    if(html_Element.parentElement.className=="side_By_Side")
    {
        for(child_Element of html_Element.parentElement.children)
        {
            if(window.getComputedStyle(child_Element, null).getPropertyValue('height')==old_Height)
            {
                child_Element.style.height=new_Height;
            }
        }
    }
    while(true)
    {
        if(html_Element.parentElement!=null)
        {
            html_Element=increase_Parent_Height(html_Element);
        }
        else
        {
            break;
        }
    }
}
function manage_Text_Width(html_Element)
{
    //make sure you can do this even tho the outputs (I think) are in strings
    if(window.getComputedStyle(html_Element, null).getPropertyValue('height')>window.getComputedStyle(html_Element.parentElement, null).getPropertyValue('height'))
    {
        html_Element.style.width="80%";
    }
    else if (html_Element.style.width=="90%")
    {
        html_Element.style.width="70%";
    }
}
function arrange_Links_In_LinkHolders()
{
    function calculate_Margins(total_Link_Width_In_Row, num_Links_In_Row, total_Links_Processed, linkHolder)
    {
        var times_Looped=0;
        for(html_Element of linkHolder.children)
        {
            times_Looped+=1;
            if(times_Looped>total_Links_Processed-num_Links_In_Row)
            {
                html_Element.style.marginLeft=(html_Element.parentElement.offsetWidth-total_Link_Width_In_Row)/(num_Links_In_Row+1);
            }
            if(times_Looped==num_Links_In_Row+total_Links_Processed)
            {
                break;
            }
            HTML_Element_Centerer.center_HTML_Element_Vertically(html_Element);
        }
    }
    for (linkHolder of document.getElementsByClassName("linkHolder")) {
        var total_Link_Width_In_Row=0;
        var num_Links_In_Row=0
        var total_Links_Processed=0;
        for(html_Element of linkHolder.children)
        {
            total_Link_Width_In_Row+=parseInt(window.getComputedStyle(html_Element, null).getPropertyValue('width')) + parseInt(window.getComputedStyle(html_Element, null).getPropertyValue("padding-left"))+parseInt(window.getComputedStyle(html_Element, null).getPropertyValue("padding-right"));
            num_Links_In_Row+=1;
            total_Links_Processed+=1;
            if(total_Link_Width_In_Row+((num_Links_In_Row+1)*(html_Element.parentElement.offsetWidth*0.05))>html_Element.parentElement.offsetWidth || total_Link_Width_In_Row+((num_Links_In_Row+1)*7)>html_Element.parentElement.offsetWidth)
            {
                calculate_Margins(total_Link_Width_In_Row, num_Links_In_Row, total_Links_Processed, linkHolder);       
                num_Links_In_Row=0;
                total_Link_Width_In_Row=0;
            }
        }
        if(num_Links_In_Row > 0) {
            calculate_Margins(total_Link_Width_In_Row, num_Links_In_Row, total_Links_Processed, linkHolder);     
        }
    }
}
//need to make it check to make sure one does not exceend parent size
function adapt_Image(html_Element)
{
    function convert_Dimension_To_Int(dimension)
    {
        return parseInt(dimension.replace('px', ''));
    }
    function adjust_Based_On_Width(html_Element)
    {
        let img_Ratio=image_Width/image_Height;
        html_Element.style.width=((convert_Dimension_To_Int(window.getComputedStyle(html_Element.parentElement, null).getPropertyValue('width')))*0.8)+'px';
        html_Element.style.height=convert_Dimension_To_Int(html_Element.style.width)/img_Ratio +'px';
        update_Size_Vars(html_Element);
        if(image_Height>convert_Dimension_To_Int(window.getComputedStyle(html_Element.parentElement, null).getPropertyValue('height')))
        {
            adjust_Based_On_Height(html_Element);
        }
    }
    function adjust_Based_On_Height(html_Element)
    {
        let img_Ratio=image_Width/image_Height;
        html_Element.style.height=((convert_Dimension_To_Int(window.getComputedStyle(html_Element.parentElement, null).getPropertyValue('height')))*0.8)+'px';
        html_Element.style.width=convert_Dimension_To_Int(html_Element.style.height)*img_Ratio +'px';
        update_Size_Vars(html_Element);
        if(image_Width>convert_Dimension_To_Int(window.getComputedStyle(html_Element.parentElement, null).getPropertyValue('width')))
        {
            adjust_Based_On_Width(html_Element);
        }
    }
    function update_Size_Vars(html_Element)
    {
        image_Width=convert_Dimension_To_Int(html_Element.style.width);
        image_Height=convert_Dimension_To_Int(html_Element.style.height);
    }
    var image_Width=convert_Dimension_To_Int(window.getComputedStyle(html_Element, null).getPropertyValue('width'));
    var image_Height=convert_Dimension_To_Int(window.getComputedStyle(html_Element, null).getPropertyValue('height'));
    if(image_Height>image_Width)
    {
        adjust_Based_On_Height(html_Element);
    }
    else
    {
        adjust_Based_On_Width(html_Element);
    }
}
function convert_Dimensions_To_Visible_Dimensions(html_Element)
{
    function calculate_Conversions(size, height_Or_Width)
    {
        if(height_Or_Width=="height")
        {
            size=(size/window.outerHeight)*window.innerHeight;
        }
        else
        {
            size=(size/window.outerWidth)*window.innerWidth;
        }
        return size;
    }
    let computed_Style=window.getComputedStyle(html_Element, null);
    html_Element.style.height=calculate_Conversions(computed_Style.getPropertyValue('height'), "height");
    html_Element.style.width=calculate_Conversions(computed_Style.getPropertyValue('width'), "width");
    html_Element.style.top=calculate_Conversions(computed_Style.getPropertyValue('top'), "height");
    html_Element.style.bottom=calculate_Conversions(computed_Style.getPropertyValue('bottom'), "height");
    html_Element.style.left=calculate_Conversions(computed_Style.getPropertyValue('left'), "width");
    html_Element.style.right=calculate_Conversions(computed_Style.getPropertyValue('right'), "width");
    html_Element.style.marginTop=calculate_Conversions(computed_Style.getPropertyValue('margin-top'), "height");
    html_Element.style.marginBottom=calculate_Conversions(computed_Style.getPropertyValue('margin-bottom'), "height");
    html_Element.style.marginLeft=calculate_Conversions(computed_Style.getPropertyValue('margin-left'), "width");
    html_Element.style.marginRight=calculate_Conversions(computed_Style.getPropertyValue('margin-right'), "width");
    //set default smallest font size to 14 possibly code in something to do this with ones with larger default sizes too
    if(html_Element.style.fontSize!=14)
    {
        //only works if all font size is in width
        html_Element.style.fontSize=calculate_Conversions(computed_Style.getPropertyValue('font-size'), "width");
    }
    //possibly work on this later
    /**for(html_Element_Child of html_Element.children)
    {
        convert_Dimensions_To_Visible_Dimensions(html_Element_Child);
    }
    **/
}
//not sure if this is good practice, but with how page is coded its necessary
function revert_To_CSS_Styles()
{
    for (html_Element of document.getElementsByTagName('*'))
    {
        for(style of html_Element.style)
        {
            html_Element.style="revert";
        }
    }
}
//let prevents variables from being visible in a seperate block statement (like if for etc)
//could set links to innerWidth but it doesn't rlly matter
//maybe set all things to visible dimensions
function position_Components(images_Have_Loaded){
    HTML_Element_Centerer();
    function convert_Dimension_To_Int(dimension)
    {
        return parseInt(dimension.replace('px', ''));
    }
    function position_Image(html_Element)
    {
        adapt_Image(html_Element);
        HTML_Element_Centerer.center_HTML_Element(html_Element);
    }
    revert_To_CSS_Styles();
    for (html_Element of document.getElementsByTagName('*'))
    {
        convert_Dimensions_To_Visible_Dimensions(html_Element);
    }
    //the problem with title stems from width changing after the line directly below runs
    HTML_Element_Centerer.center_HTML_Element(document.getElementById("title_Of_Page"));
    HTML_Element_Centerer.center_HTML_Element_Horizontally(document.getElementById("main_Body"));
    for (html_Element of document.getElementsByClassName("subtitle"))
    {
        HTML_Element_Centerer.center_HTML_Element_Horizontally(html_Element);
    }
    for (html_Element of document.getElementsByClassName("side_By_Side"))
    {
        HTML_Element_Centerer.center_HTML_Element_Horizontally(html_Element);
    }
    for (html_Element of document.getElementsByClassName("box"))
    {
        if(!html_Element.classList.contains("videoBox")) {
            HTML_Element_Centerer.center_HTML_Element_Vertically(html_Element);
        }
    } 
    for(html_Element of document.getElementsByClassName("text"))
    {
        manage_Text_Width(html_Element);
        HTML_Element_Centerer.center_HTML_Element(html_Element);
        if(html_Element.parentElement.className.indexOf("text_Container")!==-1)
        {
            set_Min_Size_To_Size_Of_Child_Elements(html_Element.parentElement);
            HTML_Element_Centerer.center_HTML_Element(html_Element);
        }
    }
    for (html_Element of document.getElementsByClassName("boxImageLink")) {
        //there should only ever be one child
        for(html_Element_Child of html_Element.children) {
            html_Element.width = html_Element_Child.width;
            html_Element.height = html_Element_Child.height;
        }
    }
    for(html_Element of document.getElementsByClassName("box_Image"))
    {
        if(images_Have_Loaded==true)
        {
            if (html_Element.parentElement.classList.contains("boxImageLink")) {
                position_Image(html_Element.parentElement);
            }
            position_Image(html_Element);
        }
        else
        {
            if (html_Element.parentElement.classList.contains("boxImageLink")) {
                html_Element.onload=function(){position_Image(html_Element.parentElement);}
            }
            html_Element.onload=function(){position_Image(html_Element);}
        }
    }
    for(html_Element of document.getElementsByClassName("boxVideo"))
    {
        if(images_Have_Loaded==true)
        {
            if (html_Element.parentElement.classList.contains("boxImageLink")) {
                position_Image(html_Element.parentElement);
            }
            position_Image(html_Element);
        }
        else
        {
            if (html_Element.parentElement.classList.contains("boxImageLink")) {
                html_Element.onload=function(){position_Image(html_Element.parentElement);}
            }
            html_Element.onload=function(){position_Image(html_Element);}
        }
    }
    arrange_Links_In_LinkHolders();
    document.body.style.height=convert_Dimension_To_Int(window.getComputedStyle(document.getElementById("main_Body"), null).getPropertyValue("height"))+convert_Dimension_To_Int(window.getComputedStyle(document.getElementsByClassName("parallax_Effect_Creator")[0], null).getPropertyValue("height"))+'px';
}
//inital setup
position_Components(false);
window.onload = function(){position_Components(true);};
//we need to find a way to make it that the resize occurs after css sizes from the max(#vw, #px) have loaded
var doit;
window.onresize = function() {
    clearTimeout(doit);
    doit = setTimeout(position_Components(true), 100);
}



