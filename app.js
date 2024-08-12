const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash")

const homeStartingContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore quidem possimus ratione qui at magni provident beatae voluptates pariatur ducimus voluptatem voluptas perspiciatis quod eaque dolore consequuntur, unde dolorem harumquam quia rem ex tempora. Suscipit quibusdam quis, ad fuga, voluptatibus omnis enim quisquam eligendi nemo asperioreslaborum sint? Molestias laudantium consequuntur natus necessitatibus harum?"
const aboutStartingContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis ipsa aperiam tenetur quia minus sint autem soluta, dolorem eligendi eaque quasi laboriosam est, exercitationem incidunt commodi animi, ratione esse nihil necessitatibus non recusandae rerum veritatis quisquam! Minima iusto magni totam cupiditate rerum. Qui, rem sint? Possimus nesciunt alias hic porro excepturi ipsum repudiandae similique? Repellat, numquam. Quasi modi, illum labore, vero voluptatem accusamus cupiditate et accusantium ut, est doloribus assumenda."
const contactStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt repudiandae omnis reprehenderit explicabo sequi? Ipsum deleniti quo incidunt repellendus eligendi sit impedit tempore, quam error consequuntur. Sint neque illo non nobis, laudantium hic?"
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var posts=[];
app.use(express.static("public"));


app.get("/", function (req, res) {
    
    res.render("home", { homeContent: homeStartingContent,postContent:posts});      
})
app.get("/about", function (req, res) {
    res.render("about", { aboutContent: aboutStartingContent });
})
app.get("/contact", function (req, res) {
    res.render("contact", { contactContent: contactStartingContent });
})
app.get("/compose", function (req, res) {

    res.render("compose");
})
app.get("/posts/:subject",function(req,res){
    const requestedTitle=_.lowerCase( req.params.subject);
    posts.forEach(element => {
        const storedTitle = element.inputTitle;
        const storedBodyContent = element.bodyTitle;
        if ( _.lowerCase(storedTitle)===requestedTitle) {

            res.render("post",{
                titleContent:storedTitle,
                bodyContent:storedBodyContent
            });
        }  

    });
})

app.post("/compose", (req, res) => {
    const post ={

        inputTitle:req.body.postTitle,
        bodyTitle:req.body.postBody
    }
    posts.push(post);
    res.redirect("/")
})
app.listen(3000, (e) => {
    console.log("Good to go da boi!!")
})
