---
id: creating-your-first-event-listener
title: Creating Your First Event Listener
sidebar_label: Creating Your First Event Listener
---

## Prerequisites

This guide assumes that you have a [plugin environment](/docs/development/creating-first-plugin) setup.
If you have not already, follow that guide first.

## Event Concept

Many actions done by players, blocks or mobs trigger an event. Technically: a class extending `Event`. Events allow you to know, edit or cancel default behaviour.
For your plugin to get informed when an event happens, you need to create a class implementing `EventListener` (a marker interface):

```java
public class MyFirstEventHandler implements EventListener {}
```

Now we marked the class for us and the api as event listener. Next up we need to define which event(s) we want to listen to in this event listener.
This is done simply by creating a method annotated with @EventHandler inside:

```java
public class MyFirstEventHandler implements EventListener {

  @EventHandler
  public void onExplode(EntityExplodeEvent event) {
    // this method gets called every time an entity explodes
  }
}
```

Now we just need to implement some logic. We can praise explosions for example with a chat message sent to every player:


```java
public class MyFirstEventHandler implements EventListener {

  @EventHandler
  public void onExplode(EntityExplodeEvent event) {
    GoMint.instance().getPlayers().forEach(p -> {
      p.sendMessage("Hooray, " + event.getAffectedBlocks().size() + " are gone!");
    });
  }
}
```

## Cancellable events
