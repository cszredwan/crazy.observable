import { Observable } from 'rxjs';
import { assigningResourceUnitsAtFirstActivity } from './discreteRandomAssignment.js';

export function crazyObservable(totalNumberOfEmissions,
				timeInterval,
				totalNumberOfTimeIntervals) {
    
    return new Observable( subscriber => {

	let emissionsByTimestep = Array(totalNumberOfTimeIntervals);
	
	let leftNumberOfEmissions = totalNumberOfEmissions;
	
	let virtualElapsedNumberOfTimesteps = 0;
	let realElapsedNumberOfTimesteps = 0;
	
	while (virtualElapsedNumberOfTimesteps < totalNumberOfTimeIntervals) {
	    
	    emissionsByTimestep[virtualElapsedNumberOfTimesteps] = assigningResourceUnitsAtFirstActivity(//
		leftNumberOfEmissions, totalNumberOfTimeIntervals-virtualElapsedNumberOfTimesteps);

	    setTimeout( () => {
		for (let i=0; i < emissionsByTimestep[realElapsedNumberOfTimesteps]; i++) {
		    subscriber.next();
		}
		realElapsedNumberOfTimesteps += 1;
	    }, timeInterval * virtualElapsedNumberOfTimesteps)

	    leftNumberOfEmissions -= emissionsByTimestep[virtualElapsedNumberOfTimesteps];
	    virtualElapsedNumberOfTimesteps += 1;
	}

	setTimeout( () => subscriber.complete(), timeInterval * (totalNumberOfTimeIntervals+1));

    });
}

