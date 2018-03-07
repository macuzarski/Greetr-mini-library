(function (global, $) {
    // 'new' an object
    const Greetr = (firstName, lastName, language) => new Greetr.init(firstName, lastName, language);
    
    
    // closed within iffe, accessible only in source code
    const supportedLangs = ['en', 'es', 'jp'];
    
    //informal greetings
    const greetings = {
        en: 'Hello',
        es: 'Hola',
        jp: 'Ohayō'
    };
    
    //formal greetings
    const formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        jp: 'Ohayō gozaimasu'
    };
    
    //logger messages
    const logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
        jp: 'Roguin'
    };
    
    Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },
        
        //checking if userdeclared language is defined within the iffe closure
        validate() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        //takes greeting strings from object, refering via '[]'
        greeting() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting() {
            return formalGreetings[this.language] + ' ' + this.fullName(); + '.';
        },
      
        
        //chainable methods
        
        // if true retrieves formal greet, else informal
        greet(formal) {
            let msg;
            
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            if (console) {
                console.log(msg);
            }
            
            //'this' refers to the called atm object, making the method chainable also
            return this;
        },
        
        log() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            //make chainable
            return this;
        },
        
        setLang(lang) {
            //set the language
            this.language = lang;
            //check if valid (within the iffe closure)
            this.validate();
            //make chainable
            return this;
        },
        
        HTMLGreeting(selector, formal) {
            if (!$) {
                throw 'There is no (spoon)jQuery.';
            }
            
            if (!selector) {
                throw 'Missing jQuery selector.';
            }
            //determine the msg
            let msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            //print the message in the chosen place in the DOM
            $(selector).html(msg);
            //make chainable
            return this;
        }
        
    };
    //object contructor
    Greetr.init = function(firstName, lastName, language) {
        
        let self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
        self.validate();
    }
    //trick from jQuery, all objects created with Greetr.init constructor method can now use methods of Greetr
    Greetr.init.prototype = Greetr.prototype;
    
    //Greetr is now usable globaly, and accessable with shorthand '$G'
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery)); 