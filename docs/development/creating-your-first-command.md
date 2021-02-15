---
id: creating-your-first-command
title: Creating Your First Command
sidebar_label: Creating Your First Command
---
## Prerequisites

This guide assumes that you have a [plugin environment](creating-a-first-plugin.md) setup.
If you have not already, follow that guide first.

## Writing a ```Command``` type

Each command for GoMint plugins must extend the ```Command``` type to be recognized by the plugin manager. This guide will walk you through setting up a velocity command.

```java
public class CommandVelocity extends Command {}
```

## Using Annotations

Commands in GoMint are based on annotations and injection. There are two required annotations that each command must have, but the full list of annotations for commands are below. GoMint will detect all classes in your plugin which extend `Command` and have at least the required annotations and will automatically create an instance and register it. For custom conditions on command registration you need to use [methods for describing your command](#commandmethod) instead.

| Annotation            | Type            | Value                                                                                  | Required? | Repeatable? |
|-----------------------|-----------------|----------------------------------------------------------------------------------------|-----------|-------------|
| Name                  | String          | The command's name                                                                     | Yes       | No          |
| Description           | String          | A description of the command                                                           | Yes       | No          |
| Scope                 |                 | Where the command will be available                                                    | No        | No          |
|  - `activeWorldsOnly` | boolean         | If the command is only available to players in plugin's active worlds. Default: `true` | No        | No          |
|  - `console`          | boolean         | If the command is available to the console. Default: `true`                            | No        | No          |
| Alias                 | String          | An alias for the command that will also execute it                                     | No        | Yes         |
| Permission            | String          | The permission required for the command to execute                                     | No        | No          |
| Overload              | ...             | See [overload annotation](#overload) information                                       | No        | Yes         |

The next step to writing your command is to add the necessary annotations to the class:

```java
@Name("velocity")
@Description("Give custom velocity to the player who runs it")
public class CommandVelocity extends Command {}
```

## Required Methods

The only required method for a ```Command``` type is the ```execute``` method,
which must be overridden from ```io.gomint.command.Command``` type. Our ```CommandVelocity``` type then becomes:

```java
@Name("velocity")
@Description("Give custom velocity to the player who runs it")
public class CommandVelocity extends Command {

  @Override
  public void execute(CommandSender commandSender, String alias, Map<String, Object> arguments, CommandOutput output) {
  }
}
```

## Casting the ```CommandSender```
The ```CommandSender``` type that is passed to ```execute``` by the server's command handler can be cast in two ways: a ```PlayerCommandSender``` or a ```ConsoleCommandSender```.
It is important to verify that the sender was the correct type before performing any kind of operations on them. Player methods are unavailable to ```ConsoleCommandSender```s and vice-versa. A simple ```instanceof``` check will suffice:

```java
@Name("velocity")
@Description("Give custom velocity to the player who runs it")
public class CommandVelocity extends Command {

  @Override
  public void execute(CommandSender commandSender, String alias, Map<String, Object> arguments, CommandOutput output) {
    if (commandSender instanceof PlayerCommandSender) {
      EntityPlayer player = (EntityPlayer) commandSender;

      // Now that we have casted the CommandSender to an EntityPlayer, we can use those methods on the object.
      // Commands from players are executed on player'S current world thread, so we do not need to care about that for now.
      player.setVelocity(new Vector(0, 2, 0));
    } else if (commandSender instanceof ConsoleCommandSender) {
      // TODO: Let's add arguments in a moment!
    }
  }
}
```

## Get Plugin class
If we need the Plugin class, we can use the [```@InjectPlugin```](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/plugin/injection/InjectPlugin.html) annotation on a field with the type of our Plugin class; this only works in annotation-defined commands.

```java
@Name("velocity")
@Description("Give custom velocity to the player who runs it")
public class CommandVelocity extends Command {

  @InjectPlugin
  private TestPlugin plugin;
}
```


## Adding Permissions
Adding permissions to a command is as simple as adding the permission annotation.
Supposing that we want to only allow players to use the velocity command if they have the ```velocityplugin.command.velocity```, we can append the annotation to the class declaration:

```java
@Name("velocity")
@Description("Give custom velocity to the player who runs it")
@Permission("velocityplugin.command.velocity")
public class CommandVelocity extends Command {...}
```

## Using Parameters (Arguments)
For more complicated commands that require parameters to be passed, you can both check and validate the types of arguments passed. First, we will address how to use the arguments passed to a command. Second, we will address how to use annotations to validate the types of these arguments.

### <span id="overload"></span> Overload Annotation
When using arguments, we can validate their type as well as assign them names. This allows us to anticipate not only the way the arguments of the command are organized, but their types, and, to a degree, validate their content.

For arguments, the ```Overload``` annotation is used. Within this annotation, ```Parameter``` annotations can be used to define a name for the arguments passed, a validator to use, and specify whether or not the parameter is optional.

__Note:__ _For each ```Overload``` annotation, your command will have a different way to organize parameters. Multiple ```Overload``` annotations can be summarized by using the ```Overloads``` annotation._

The parameter annotation accepts the following fields:
* ```name``` - String: The name of the parameter (stored as a key in the ```arguments``` map)
* ```validator``` - Class that extends ParamValidator: The validator to use for this parameter. Can be implemented, or you can use any of the API's built-in [validators](https://github.com/gomint/GoMint/tree/master/gomint-api/src/main/java/io/gomint/command/validator)
* ```optional``` - Boolean: Whether or not the parameter is optional (note: defaults to false)


```java
// Our velocity command should be able to accept a parameter for a player name and the specified velocity they should receive.
@Overload({
  @Parameter(name = "player", validator = TargetValidator.class, optional = true),
  @Parameter(name = "velocity_x", validator = FloatValidator.class, optional = true),
  @Parameter(name = "velocity_y", validator = FloatValidator.class, optional = true),
  @Parameter(name = "velocity_z", validator = FloatValidator.class, optional = true)
})
```

### Arguments Passed
The arguments passed when a command is executed by the player/console are passed to ```execute``` in the Map object ```arguments```. For our velocity command example, we will allow a ```ConsoleCommandSender``` to specify a player's name to apply the velocity to. We also have to schedule our work to the target player's world here, as console commands are running in a different thread.

```java
    // Continued from above
    else if (commandSender instanceof ConsoleCommandSender) {
      EntityPlayer player = (EntityPlayer) arguments.get("player");
      Float velocity_x = (Float) arguments.getOrDefault("velocity_x", 0f);
      Float velocity_y = (Float) arguments.getOrDefault("velocity_y", 2f);
      Float velocity_z = (Float) arguments.getOrDefault("velocity_z", 0f);

      // As we are scheduling the command's world to another thread, command execution ends asynchroniously
      // We have to mark this and later call markFinished() when our command execution is over.
      output.markAsync();

      // Cannot not edit player's velocity asynchroniously - we schedule to player's world thread
      player.world().scheduler().execute(() -> {
        // If all the parameters were passed, the player will receive the specified velocity.
        // Otherwise, they will receive a velocity of (x: 0, y: 2, z: 0).
        player.setVelocity(new Vector(velocity_x, velocity_y, velocity_z));

        // When the velocity was successfully applied to the given player, a message will be sent to the ConsoleCommandSender.
        output.success("Applied velocity to " + player.getNameTag()).markFinished(); // markFinished() is required after calling markAsync()
      });
    }
```

:::danger
Most player and world access and editing methods require that you call them from the (player's) world's thread. Not doing so will throw an exception in runtime.
:::

## Additional Information
### <span id="commandmethod"></span>  Adding Commands Using Methods

If you want to have commands registered based on custom conditions, you need to use method calls to describe your command instead of annotations.

You register your method-based described commands with the `registerCommand(/* your command instance*/);` method present in the `Plugin` object (your main class).

The name of the command has to be delivered as parameter of the Command class constructor and the description has to be set with the `description(String)` method:

```java
public class CommandVelocity extends Command {

  public CommandVelocity() {
    super("velocity");
    description("Give custom velocity to the player who runs it");
  }

  @Override
  public CommandOutput execute(CommandSender commandSender, String alias, Map<String, Object> arguments, CommandOutput output) {
  }
}
```

The other method names are named similar to the annotation as well:

| Annotation  | Method                | Type   | Value                                              | Required? | Repeatable? |
|-------------|-----------------------|--------|----------------------------------------------------|-----------|-------------|
| Name        | super("...")          | String | The command's name                                 | Yes       | No          |
| Description | description("...")    | String | A description of the command                       | Yes       | No          |
| Alias       | alias("...")          | String | An alias for the command that will also execute it | No        | Yes         |
| Permission  | permission("...")     | String | The permission required for the command to execute | No        | No          |
| Overload    | overload().param(...) | ...    | See below                                          | No        | Yes         |

Calling not repeatable methods again will overwrite the existing value.

### <span id="overloadmethod"></span> Overload Method

Each call to `overload()` will add a new overload to your method. By default the overload is empty. To add a parameter you have to call the `param(...)` functions on the return `ComandOverload` object.

The param function takes the name of parameter first, next up is the ParamValidator. The third argument is the optional boolean, which is itself optional and defaults to false as well.
The ParamValidator needs to be instantiated here instead of it's class given.

```java
  public CommandVelocity() {
    super("velocity");
    description("Give custom velocity to the player who runs it");
    permission("velocityplugin.command.velocity");
    overload().param("player", new TargetValidator(), true)
        .param("velocity_x", new FloatValidator(), true)
        .param("velocity_y", new FloatValidator(), true)
        .param("velocity_z", new FloatValidator(), true);
}
```
