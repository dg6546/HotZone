# HotZone

For the staff member of CHP who need to maintain records of each confirmed case of a viral infection and deduce the possible transmission cluster, HotZone is a browser application that will manage the storage of data and identify and visualise the transmission clusters. 

Unlike storing and managing all data in Excel spreadsheets, which has no means to cluster cases by location visited, HotZone enables data recording with a higher efficiency, and it can perform clustering appropriately. 

# What's included

Django Server: Aa a backend service which renders html pages upon successful requests.

PostgreSQL: Backend Service to maintain data integrity and secured access of data.


# Features

* Login/Logout & Authentication 
* Forget & Change Password
* Search Case, Virus and Patient Records
* Add Location Records for a Particular Case
* Clustering with Customisable Parameters

# Limitations

* Exact String Search for Looking up for an Existing Location Record
* Lack of Sufficient Testing (Scalability test, Database Testing)

# What's Next

* Overcoming the Limitations
* Separation of Backend and Frontend Applications to improve functionality
* Migration to the existing [ReactJS](hotzone_ui/) application as the frontend framework to improve UI/UX
