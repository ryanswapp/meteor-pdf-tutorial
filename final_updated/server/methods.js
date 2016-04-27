import webshot from 'webshot';
import fs from 'fs';
import Future from 'fibers/future';

Meteor.methods({
  'pokemon/generate_pdf': function() {
    // SETUP
    // Grab required packages
    var fut = new Future();
    var fileName = "pokemon-report.pdf";

    // GENERATE HTML STRING
    var css = Assets.getText('style.css');

    SSR.compileTemplate('layout', Assets.getText('layout.html'));

    Template.layout.helpers({
      getDocType: function() {
        return "<!DOCTYPE html>";
      }
    });

    SSR.compileTemplate('pokemon_report', Assets.getText('pokemon-report.html'));

    // PREPARE DATA
    var pokemon = Pokemon.find({});
    var data = {
      pokemon: pokemon
    }

    var html_string = SSR.render('layout', {
      css: css,
      template: "pokemon_report",
      data: data
    });

    // WEBSHOT OPTIONS
    var options = {
        "paperSize": {
            "format": "Letter",
            "orientation": "portrait",
            "margin": "1cm"
        },
        siteType: 'html'
    };

    // COMMENCE WEBSHOT
    console.log("Commencing webshot...");
    webshot(html_string, fileName, options, function(err) {
        fs.readFile(fileName, function (err, data) {
            if (err) {
                return console.log(err);
            }

            fs.unlinkSync(fileName);
            fut.return(data);
        });
    });

    let pdfData = fut.wait();
    let base64String = new Buffer(pdfData).toString('base64');

    return base64String;
  }
});