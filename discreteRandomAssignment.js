function probabilityAssigningResourceUnitsInFirstActivity(resourceUnits, totalResourceUnits, numberOfActivities) {
    if (numberOfActivities === 2) {
	return 1 / (totalResourceUnits + 1);
    } else if (numberOfActivities > 2) {
	let answer = 1 - totalResourceUnits / (totalResourceUnits + numberOfActivities - 1)
	for (let activity = 1; activity < numberOfActivities - 1; activity++) {
	    answer *= (1 - resourceUnits / (totalResourceUnits + activity));
	}
	return answer
    }
}

export function assigningResourceUnitsAtFirstActivity(totalResourceUnits, numberOfActivities) {

    if (numberOfActivities === 0) {
	throw "No activity found.";
    } else if (totalResourceUnits === 0) {
	return 0;
    }

    let leftResourceUnits = totalResourceUnits;
    
    let randomValue = Math.random();
    let accumulatedProbability = 0;

    for (let resourceUnits = 0; resourceUnits < leftResourceUnits+1; resourceUnits++) {
	accumulatedProbability += probabilityAssigningResourceUnitsInFirstActivity(resourceUnits,
										   leftResourceUnits,
										   numberOfActivities);
	if (randomValue < accumulatedProbability) {
	    return resourceUnits;
	}
    }
}

export function discreteRandomAssignment(totalResourceUnits, totalNumberOfActivities) {
    
    if (totalNumberOfActivities === 0) {
	throw "No activity found.";
    } else if (totalResourceUnits === 0) {
	return Array(totalNumberOfActivities).fill(0);
    }
    
    let leftResourceUnits = totalResourceUnits;
    let leftNumberOfActivities = totalNumberOfActivities;

    var randomAssignmentArray = [];
    
    while (leftNumberOfActivities > 1) {
	let resourceUnits = discreteRandomAssignmentAtFirstActivity(leftResourceUnits, leftNumberOfActivities)
	randomAssignmentArray.push( resourceUnits );
	leftResourceUnits -= resourceUnits;
	leftNumberOfActivities -= 1;
    }

    randomAssignmentArray.push(leftResourceUnits);
    
    return randomAssignmentArray;
}
