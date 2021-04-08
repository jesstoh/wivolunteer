import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import { Pie, Bar } from "react-chartjs-2";

class FeedbackStats extends Component {

    render() {
        const data = {
            labels: ["Just Nice", "More than enough ", "Not enough"],
            datasets: [
                {
                    data: [65, 59, 80],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
            ],
        };

        const data1 = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [5, 7, 8, 10, 2]
              }
            ]
          };
        return (
            <MDBContainer>
                <h1>Event statistics</h1>
                <h2>Did you allocated sufficient resources for your event?</h2>
                <Pie data={data} />
                <h2>How well organized is your event?</h2>
                <Bar
                    data={data1}
                    width={100}
                    height={50}
                    
                />
                <h2>How satisfied are participants after your event?</h2>

                <h2>How satisfied are participants after your event?</h2>
                <h1>Additional Information</h1>
            </MDBContainer>
        );
    }
}

export default FeedbackStats;
