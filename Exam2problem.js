function MenuChoice() //Define section visibility
{
    if (document.getElementById("menu").value =="Show Section 1")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Show Section 2")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Show Section 3")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Show Section 4")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
    }
}

//Function for Section 1 - to get all categories

function GetCategories()
{
 var obj = new XMLHttpRequest(); 

 var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";

obj.onreadystatechange = function()
 {
 if (obj.readyState == 4 && obj.status == 200)
 {
 var allcategories = JSON.parse(obj.responseText);
 GenerateCategories(allcategories);
 }
 }
 obj.open("GET", url, true);
 obj.send();
}
function GenerateCategories(output)
{
 var total = 0;
 var displaycategories = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";

 for (total = 0; total < output.GetAllCategoriesResult.length; total++)
 {
 displaycategories += "<tr><td>" + output.GetAllCategoriesResult[total].CID + "</td><td>" +
 output.GetAllCategoriesResult[total].CName + "</td><td>" + output.GetAllCategoriesResult[total].CDescription + "</td></tr>";
 }
    
 displaycategories += "</table>";
 document.getElementById("displayallcategories").innerHTML = displaycategories;
}

//Function for Section 2 - to create new category
function CreateACategory()
{
 var objRequest = new XMLHttpRequest();
 var link = " http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";

 var categoryname = document.getElementById("catname").value;
 var categorydescription = document.getElementById("catdescrip").value;
 var categoryid = 0;

 var category = '{"CID":"' + categoryid + '","CName":"' + categoryname + '","CDescription":"' + categorydescription + '"}';

 objRequest.onreadystatechange = function()
 {
 if (objRequest.readyState == 4 && objRequest.status == 200)
 {
 var result = JSON.parse(objRequest.responseText);
 OperationResult(result);
 }
 }

 objRequest.open("POST", link, true);
 objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 objRequest.send(category);

}
function OperationResult(newcat)
{
 if (newcat.WasSuccessful == 1)
 {
 document.getElementById("categoryresult").innerHTML = "The category was added successfully!"
 }
 else
 {
 document.getElementById("categoryresult").innerHTML = "The category was not added successfully!" + "<br>" + newcat.Exception;
 }
}

//Function for Section 3 - to update category description
function UpdateDescription()
{
 var newobj = new XMLHttpRequest();
 var newurl = " http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";

 var catid = document.getElementById("catid").value;
 var catdescrip = document.getElementById("newdescrip").value;

 var newdescription = '{"CID":"' + catid + '","CDescription":"' + catdescrip + '"}';

 newobj.onreadystatechange = function()
 {
 if (newobj.readyState == 4 && newobj.status == 200)
 {
 var updateresult = JSON.parse(newobj.responseText);
 DescriptionOutput(updateresult);
 }
 }

 newobj.open("POST", newurl, true);
 newobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 newobj.send(newdescription);

}
function DescriptionOutput(newdescrip)
{
 if (newdescrip.WasSuccessful == 1)
 {
 document.getElementById("updateresult").innerHTML = "The category description was updated successfully!"
 }
 else if (newdescrip.WasSuccessful == 0)
 {
 document.getElementById("updateresult").innerhtml = "The operation failed with an unspecified error!"
 }
 else if (newdescrip.WasSuccessful == -2)
 {
 document.getElementById("updateresult").innerhtml = "The operation failed because the data string supplied could not be deserialized into the service object."
 }
 else
 {
 document.getElementById("updateresult").innerHTML = "The operation failed because a record with the supplied order ID could not be found." + "<br>" + newdescrip.Exception;
 }
}

//Function for Section 4 - to delete a category
function DeleteCategory()
{
 var delobj = new XMLHttpRequest();
 var webservice = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
 webservice += document.getElementById("cid").value;
 
 delobj.onreadystatechange = function()
 {
 if (delobj.readyState == 4 && delobj.status == 200)
 {
 var deleteresult = JSON.parse(delobj.responseText);
 CategoryResult(deleteresult);
 }
 }

var r = confirm("Are you sure you want to delete this category?");
 
if (r==true)
{
 delobj.open("GET", webservice, true);
 delobj.send();
}
else
{
    
}

}
function CategoryResult(delresult)
{ 
    
 if (delresult.DeleteCategoryResult.WasSuccessful == 1)
 {
 document.getElementById("deleteresultdisplay").innerHTML = "The category was deleted successfully!"
 }
 else
 {
 document.getElementById("deleteresultdisplay").innerHTML = "The category was not deleted successfully!" + "<br>" + delresult.DeleteCategoryResult.Exception;
 }
}
