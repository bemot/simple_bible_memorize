import React, { Component } from 'react';
import data from "./data"; 

class Example3 extends Component {
    render() {
	return (
            <div>
                {
                  data.Skills.map((skill) => {
                    return (
                      <div>
                        <h4>{skill.Area}</h4>
                        <ul>
                          {
                            skill.SkillSet.map((skillDetail) => {
                              return (
                                  <li>
                                    {skillDetail.Name}
                                  </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    );
                  })
                } 
            </div>
        );
    }
} 
export default Example3;