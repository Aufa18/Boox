package expo.modules.mymodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MyModule : Module() {
  override fun definition() = ModuleDefinition {
    // Define the name of the module that will be used in the app
    Name("MyModule")

    // Define the methods that will be used in the app
    Function("getNativeGreeting") { name: String ->
      "Halo $name, pesan ini datang langsung dari otak Kotlin (Android) 🤖!"
    }
  }
}
