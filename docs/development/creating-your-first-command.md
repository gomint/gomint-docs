---
id: creating-your-first-command
title: Creating Your First Command
sidebar_label: Creating Your First Command
---
## Prerequisites

This guide assumes that you have a [plugin environment](/docs/development/creating-first-plugin) setup.
If you have not already, follow that guide first.

## Writing a ```Command``` type

Each command for GoMint plugins must extend the ```Command``` type to be recognized by the plugin manager. This guide will walk you through setting up a velocity command.

```java
public class CommandVelocity extends Command {}
```

## Using Annotations

Commands in GoMint are based on annotations and injection. There are two required annotations that each command must have, but the full list of annotations for commands are below.

| Annotation  | Type            | Value                                              | Required? | Repeatable? |
|-------------|-----------------|----------------------------------------------------|-----------|-------------|
| Name        | String          | The command's name                                 | Yes       | No          |
| Description | String          | A description of the command                       | Yes       | No          |
| Alias       | String          | An alias for the command that will also execute it | No        | Yes         |
| Permission  | String          | The permission required for the command to execute | No        | No          |
| Overload    | ...             | See [overload annotation](#overload) information   | No        | Yes         |

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
  public CommandOutput execute(CommandSender commandSender, String alias, Map<String, Object> arguments){
    CommandOutput output = new CommandOutput();

    return output;
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
  public CommandOutput execute(CommandSender commandSender, String alias, Map<String, Object> arguments){
    CommandOutput output = new CommandOutput();

    if(commandSender instanceof PlayerCommandSender){
      EntityPlayer player = (EntityPlayer)commandSender;

      // Now that we have casted to an EntityPlayer, we can use those methods on the object.
      player.setVelocity(new Vector(0, 2, 0));
    }else if(commandSender instanceof ConsoleCommandSender){
      // TODO: Let's add arguments in a moment!
    }

    return output;
  }
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

For arguments, the ```OverLoad``` annotation is used. Within this annotation, ```Parameter``` annotations can be used to define a name for the arguments passed, a validator to use, and specify whether or not the parameter is optional.

__Note:__ _For each ```OverLoad``` annotation, your command will have a different way to organize parameters_

The parameter annotation accepts the following fields:
* ```name``` - String: The name of the parameter (stored as a key in the ```arguments``` map)
* ```validator``` - Class that extends ParamValidator: The validator to use for this parameter. Can be implemented, or you can use any of the API's built-in [validators](https://github.com/gomint/GoMint/tree/master/gomint-api/src/main/java/io/gomint/command/validator)
* ```optional``` - Boolean: Whether or not the parameter is optional (note: defaults to false)


```java
// Our velocity command should be able to accept a parameter for a player name and the specified velocity they should receive.
@OverLoad({
  @Parameter( name = "player", validator = TargetValidator.class, optional = true)
  @Parameter( name = "velocity_x", validator = FloatValidator.class, optional = true)
  @Parameter( name = "velocity_y", validator = FloatValidator.class, optional = true)
  @Parameter( name = "velocity_z", validator = FloatValidator.class, optional = true)
})
```

### Arguments Passed
The arguments passed when a command is executed by the player/console are passed to ```execute``` in the Map object ```arguments```. For our velocity command example, we will allow a ```ConsoleCommandSender``` to specify a player's name to apply the velocity to.

```java
    // Continued from above
    else if(commandSender instanceof ConsoleCommandSender){
      EntityPlayer player = (EntityPlayer) arguments.get( "player" );
      Float velocity_x = (Float) arguments.getOrDefault("velocity_x", 0f);
      Float velocity_y = (Float) arguments.getOrDefault("velocity_y", 2f);
      Float velocity_z = (Float) arguments.getOrDefault("velocity_z", 0f);

      // If all the parameters were passed, the player will receive the specified velocity.
      // Otherwise, they will receive a velocity of (0, 2, 0).
      player.setVelocity(new Vector(velocity_x, velocity_y, velocity_z));

      output.success("Applied velocity");
    }
```

## Additional Information
### Adding Commands Using Methods

Note: This section is in-progress and will be updated at a later date.
