# doko-stitch-serverless-backend
Cool serverless developed with Stitch

### Usage

#### Install iOS Stitch SDK

[You Can Refer to this Document](https://github.com/mongodb/stitch-ios-sdk#installation)

#### Install other dependencies

You need to install `SwiftyJSON` to decode the JSON Stitch passed by.

In Podfile:

```ruby
pod 'SwiftyJSON', :git =>'https://github.com/SwiftyJSON/SwiftyJSON.git'
```

#### Call functions you established on Stitch

```swift
var latitude :Double = 39.953321
var longitude :Double = -75.192110
client.auth.login(withCredential: AnonymousCredential()) { result in
    switch result {
    case .success(let user):
        print("logged in anonymous as user \(user.id)")
        DispatchQueue.main.async {
            // update UI accordingly

            Stitch.defaultAppClient!.callFunction(withName: "getRecentPosts", withArgs: [latitude, longitude]) { (result :StitchResult<JSON>) in
                switch result {
                case .success(let successResult):
                    print("Success result: \(successResult)")
                case .failure(let error):
                    print("Error retrieving String: \(String(describing: error))")
                }
            }

        }
    case .failure(let error):
        print("Failed to log in: \(error)")
    }
}
```
