import React, { Component } from 'react';
import { render } from 'react-dom';
 
class PageFooter extends Component {
    render() {
        return(
            <footer className="page-footer teal lighten-2">
                <div className="footer-copyright">
                    <div className="container center-align yellow-text text-lighten-2">
                     © 2017 Copyright Hello-books
                    </div>
                </div>
            </footer>    
        )
    }
}

export default PageFooter;