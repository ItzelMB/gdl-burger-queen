import React, { Component } from 'react';

class MenuMorning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: []
        };
    };

    componentDidMount() {

        const firebaseAccess = this.props.firebase.getRefDb().root.child('breakfast');
        let breakfastElements = [];

        firebaseAccess.on('value', (snapshot) => {
            let menuCopy = snapshot.val();

            for (let breakfst in menuCopy) {
                breakfastElements.push(
                    {
                        id: menuCopy[breakfst].id,
                        description: menuCopy[breakfst].description,
                        price: menuCopy[breakfst].price,
                        value: menuCopy[breakfst].value,
                        img: menuCopy[breakfst].img,
                    }
                )
            }

            this.setState({
                menu: breakfastElements
            })
        });
    };

    render() {

        return (
            <section>
                {this.state.menu.map((menuBreakfast) => {
                    return (
                        <div key={menuBreakfast.id}>
                            <img src={menuBreakfast.img} className="menuIcons"></img>
                            <p>{menuBreakfast.description}</p>
                            <p>{menuBreakfast.price}</p>
                        </div>
                    )
                })}
            </section>
        )
    };
};

export default MenuMorning;