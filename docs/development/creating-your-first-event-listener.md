---
id: creating-your-first-event-listener
title: Creating Your First Event Listener
sidebar_label: Creating Your First Event Listener
---

## Prerequisites

This guide assumes that you have a [plugin environment](creating-a-first-plugin.md) setup.
If you have not already, follow that guide first.

## Event Concept

Many actions done by players, blocks or mobs trigger an event. Technically: a class extending `Event`. Events allow you to know, edit or cancel default behaviour.

:::note
If not otherwise noted in the specifics event javadoc, events are called on the source world thread if they implement [`WorldEvent`](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/event/interfaces/WorldEvent.html).
:::

For your plugin to get informed when an event happens, you need to create a class implementing `EventListener` (a marker interface):

```java
public class MyFirstEventListener implements EventListener {}
```

Now we marked the class for us and the api as event listener. Then we have to register our class to the API. We do that for example in the `onInstall` method in our `TestPlugin` class. Events implementing `WorldEvent` are filtered by gomint so we only get events taking place in any of our [plugin's active worlds](../get-started/plugin-world-restriction.md).

```java
  @Override
  public void onInstall() {
    registerListener(new MyFirstEventListener());
  }
```

Next up we need to define which event(s) we want to listen to in this event listener.
This is done simply by creating a method annotated with `@EventHandler` which takes one argument (the event we want to listen to):

:::note
Event handling methods need to return `void`. Their visibility must be `public` or package-private. 
:::

```java
public class MyFirstEventListener implements EventListener {
  @EventHandler
  public void onExplode(EntityExplodeEvent event) {
    // this method gets called every time an entity explodes
  }
}
```

Now we just need to implement some logic. We can praise explosions for example with a chat message sent to every player:

```java
public class MyFirstEventListener implements EventListener {
  @EventHandler
  public void onExplode(EntityExplodeEvent event) {
    GoMint.instance().onlinePlayers().forEach(p -> p.sendMessage("Hooray, " + event.affectedBlocks().size() + " are gone!"));
  }
}
```

## Cancellable events

We changed our minds now and want to prevent explosions from happening. Great that [EntityExplodeEvent](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/event/entity/EntityExplodeEvent.html) extends [CancellableEvent](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/event/CancellableEvent.html). To cancel events we write this method in our event listener:

```java
  @EventHandler
  public void preventExplosions(EntityExplodeEvent event) {
    event.cancelled(true);
  }
```

## ```@EventHandler``` options

| option          | possible values |
|-----------------|-----------------|
| priority        | [EventPriority](https://janmm14.de/static/gomint/index.html?gomint.api/io/gomint/event/EventPriority.html) enum: `LOWEST`, `LOW`, `NORMAL` (default), `HIGH`, `HIGHEST` |
| ignoreCancelled | <ul><li>`true` - method will not be called for cancelled events</li><li>`false` - (default) method will be called regardless of event cancelled state</li></ul> |

### Details on priority option

We have two event listeners for the same event. So how do we define the order in which they will execute?

This is possible with the priority option of the `@EventHandler` annotation.

```java
  @EventHandler(priority = EventPriority.HIGHEST)
```

Priority `LOWEST` is called first, `HIGHEST` will be called last. So you should choose `HIGHEST` if you want to monitor the result of an event, use `HIGH` to override other plugins and use `LOWEST` or `LOW` for changes other plugins who listen on a higher priority should be able to react to.
