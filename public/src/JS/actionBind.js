//TODO: WIP - refactor, issues with multiple actions and actionTypes, and focusin https://gist.github.com/adardesign/4a19fd1c6b634dc7b6ca
var actions = {
  init: function() {
    var self = this;
    $(document).on("click submit change focusin focus blur", ".action", function(e) {
      var jThis = $(this),
        action = jThis.attr("data-action") || "",
        actionType = jThis.attr("data-action-type") || "click",
        //actionType = jThis.attr("data-action-type") || (isTouch ? "touchend" : "click"),
        preventDefault = (jThis.attr("data-prevent-default") === "false") ? false : true,
        eventType = e.type,
        runAction = function(actionData) {
          var action = (actionData.action) ? self[actionData.action] : "",
            actionType = actionData.actionType;
          if (actionType && eventType !== actionType) {
            return;
          }
          if (action && $.isFunction(action)) {
            action.apply(self, [e, jThis]);
          }
          if (preventDefault) {
            e.preventDefault();
          }
        };

      action = action.split(",");
      if ($.inArray(actionType, ["change", "focusin", "focus", "blur"]) > -1) {
        preventDefault = false;
      }
      actionType = actionType.split(",");
      if ($.inArray(eventType, actionType) < 0) {
        return;
      }
      if (jThis.hasClass("disable")) {
        if (eventType === "submit") {
          e.preventDefault();
        }
        return false; //LP-10756 - LP-10896
      }

      // LP-10896 avoid double submitting..
      // LP-11355 now running for ALL actions. 
      if (eventType == actionType && !isTouch) {
        jThis.addClass("disable");
        // WEB-33662 - TODO optional allow to pass false that will indicate not to have the disable altogether  
        var timeout = jThis.attr("data-action-timeout") || 300;
        timeout = parseInt(timeout, 10);
        if (eventType === "submit") {
          var submitButton = jThis.find("button[type=submit]").addClass("disable");
        }
        setTimeout(function removeDisableSubmit() {
          jThis.removeClass("disable");
          if (submitButton) {
            submitButton.removeClass("disable");
          }
        }, timeout);
      }
      for (var i = 0, actionLength = action.length, actionTypeLength = actionType.length; i < actionLength; i++) {
        runAction({
          action: action[(actionLength > 1) ? i : 0],
          actionType: actionType[(i < actionTypeLength) ? i : 0],
          preventDefault: preventDefault // if prevent defualt, then do all..
        });
      }
    });
  },
  add: function add(actions) {
    // for now only expects a obj
    $.extend(this, actions);
  },
  remove: function remove(action) {
    try {
      delete this[action];
    } catch (e) {}
  },
  toggleInAction: function toggleInAction(ele, action) {
    ele[(action ? action : 'toggle') + "Class"]("in-action");
  }
};