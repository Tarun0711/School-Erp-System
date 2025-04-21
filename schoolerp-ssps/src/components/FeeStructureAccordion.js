import React, { useState } from 'react';
import '../Css/Accordion.css'; // Import CSS file for styling

const FeeStructureAccordion = ({ feeStructure, onSelect }) => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const handleCheckboxChange = (e, id) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            onSelect((prevSelected) => [...prevSelected, id]); // Add the new ID to the previous selected IDs
        } else {
            onSelect((prevSelected) => prevSelected.filter(feeId => feeId !== id)); // Remove the ID from the selected IDs
        }
    };

    return (
        <>
            {feeStructure && <div key={feeStructure._id}>
                <div className="accordion">
                    <input
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(e, feeStructure._id)}
                    />
                    <div onClick={() => setIsActive(!isActive)}>
                        {feeStructure.name}
                    </div>
                </div>
                {
                    isActive && <div className={`panel ${activeAccordion === feeStructure._id ? 'active' : ''}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Fee Type</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeStructure.feeGroups.map((feeGroup) => (
                                    <tr key={feeGroup._id}>
                                        <td>{feeGroup.feeType}</td>
                                        <td>{feeGroup.amount}</td>
                                        <td>{new Date(feeGroup.dueDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

            </div>
            }
        </>


    );
};

export default FeeStructureAccordion;
